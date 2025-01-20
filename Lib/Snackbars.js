/**
 * Add a snackbar to your view
 * @param {string} text = '' 
 * @param {number} width = 0.85 
 * @param {string} alignment = 'Bottom' Top or Bottom
 * @param {string} endonmentButtonName = 'Okay' Name of the closing button
 */
muix.Snackbar = function(text = '', width = 0.85, alignment = 'Bottom'){
  
    let container = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    let body = app.CreateLayout('Card');
    
    container.AddChild(body);
    container.data.timeout = 2500;
    container.data.alignment = alignment;
    
    body.SetMargins(0.055, 0.018, 0.055, 0.018);
    body.SetCornerRadius(4);
    body.SetElevation(6);
    body.SetSize(width, 0.065);
    
    const box = app.CreateLayout("Linear", "Horizontal");
    box.SetSize(width, 0.065);
    body.AddChild(box);
    
    let snackText = app.CreateText(text, null, null, 'Multiline,AutoScale,VCenter');
    snackText.SetTextColor('black');
    snackText.SetMargins(0.055, 0.018, 0.055, 0.01);
    snackText.SetTextSize(16);
    box.AddChild(snackText);
    
    let snackButton = app.CreateText('', null, null, "VCenter,FillXY,AutoScale,Wrap,Right");
    snackButton.SetMargins(null, null, 16, null, 'dp');
    snackButton.SetTextSize(16);
    snackButton.SetOnTouchDown(callClosingFn)

    box.AddChild(snackButton);
    
    function applyStyling(){
        box.SetBackColor(color.inverseSurface)
        snackText.SetTextColor(color.inverseOnSurface)
        snackButton.SetTextColor(color.inversePrimary)
    }
    
    applyStyling()
    
    globalThis.theme.subscribe(()=>{
        applyStyling()
    })
    
    function callClosingFn(){
        if (container.data.onpress){
            container.data.onpress()
        } else {
            snackBarFunctions.Hide()
        }
    }
    
    function getProperAnimation(isMovingIn){
        if (container.data.alignment.toLocaleLowerCase() == 'bottom'){
            if (isMovingIn){
                return 'SlideFromBottom'
            } else {
                return 'SlideToBottom'
            }
        } else {
            if (isMovingIn){
                return 'SlideFromTop'
            } else {
                return 'SlideToTop'
            }
        }
    }
    
    let timeout;
    
    const snackBarFunctions = {
        
        /**        
         * Set the timeout for the snackbar to close
         * @param {number} time 
         */
        SetTimeout(time){
            container.data.timeout = time;
        },
        
        /**        
         * Set the snackbar's button text
         * @param {} text 
         */
        SetEndornmentText(text){
            snackButton.SetText(text)
        },
        /**        
         * Show the snackbar
         */
        Show: function(){
            container.Animate(getProperAnimation(1), ()=>{
                timeout = setTimeout(()=>{
                    snackBarFunctions.Hide()
                }, 
                container.data.timeout + 750)
            }, 750)
            
            app.AddLayout(container);
            
        },
        
        /**        
         * Hide the snackbar
         */
        Hide: function(){
            container.Animate(getProperAnimation(0), ()=>{
                 app.DestroyLayout(container);
                 container.Destroy()
                 clearTimeout(timeout)
            }, 750) 
        },
        
        /**        
         * Call a function when the user touches your endonement
         * Button
         * @param {Function} Fn 
         */
        SetOnTouch: function(Fn){
            container.data._nohash = false;
            container.data.onpress = Fn;
        }
    }
    
    return snackBarFunctions;
}
