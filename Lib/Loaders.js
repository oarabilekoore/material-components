/**
 * Add a progress bar to your view
 * @param {Ds-Layout} parent 
 * @param {number} value = 40 
 * @param {number} width = 0.8 
 * @param {string} type = "linear" | "linearintermediate"
 */
muix.ProgressBar = function (value = 40, width = 0.8, parent) {
    let container = app.AddLayout(parent, "Absolute", "Horizontal,Left,FillXY");
    container.SetSize(width, 0.005);
    container.data.value = value;
    
    let bar = app.AddText(container, " ");
    let animationTimeout;
    
    function startAnimation(shouldStartAhead) {
        animationTimeout = setTimeout(function () {
            shouldStartAhead ? delay = 500 : delay = 2000
            
            // DO NOT REMOVE THESE TRY-CATCHES, THEY ARE TO PREVENT A NULL ERROR !!!!!!
            try {
                bar.Tween({ x: 1.5, y: 0, w: width, h: -1 }, delay, "Sinusoidal.In", 0, false, () => {
                    try{
                        //bar.Hide()
                        bar.Tween({ x: -0.1, y: 0, w: 0.1, h: -1 }, 0, 'Sinusoidal.In', 0, false,
                        () => {
                            try {
                                bar.Show(), startAnimation();
                            }catch(e){
                                bar.Release()
                                container.Release()
                            }
                        });
                    }
                    catch(e){
                        bar.Release()
                        container.Release()
                    }
                });
            }
            catch(e){
                bar.Release()
                container.Release()
            }
        }, 0);
        
    }
    
    function applyStyling(type) {
        switch (type) {
            case "intermediate":
                container.SetBackColor(color.secondaryContainer);
                container.data.type = 'linearintermediate'
                bar.SetBackColor(color.primary);
                bar.SetPosition(-0.1)
                bar.SetSize(0.1, -1);
                startAnimation();
                
                break;

            default:
                container.SetBackColor(color.secondaryContainer);
                bar.SetSize(parseFloat(value / 100) * width, -1);
                bar.SetBackColor(color.primary);
                container.data.type = 'linear'
        }
    }
    
    /**    
     * set the value of the progress-bar
     * @param {number} value 
     */
    container.SetValue = function(value){
        if (value >= 100) {
            if (container.data.type.includes('intermediate')){
                container.DestroyChild(bar)
                parent.DestroyChild(container)      
            }
            else {
                bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100) * width, h: -1 }, 750, 
                "Linear.None", 0, 0, ()=>{
                    parent.DestroyChild(container)
                    container.Release()
                }) 
            }
        } 
        else {
            bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100) * width, h: -1 }, 750, 
            "Linear.None")
            container.data.value = value
        }
    }
    
    /**    
     * Set the progress-bar type
     * @param {} type 
     */
    container.SetBarType = function(type){
        applyStyling(type) || globalThis.theme.subscribe(()=>{
            container.SetBackColor(color.secondaryContainer);
            bar.SetBackColor(color.primary);
        })
    }
    /**    
     * get the progress value
     */
    container.GetValue = function(){
        return container.data.value;
    }
    return container;
}