//ide.MakePlugin('Material')
//app.LoadScript('Material.js')
 app.LoadPlugin('Material');

class Main extends App {
    onStart(){
        app.ScaffoldMaterialTheme()
        homePage()
    }
}
// +
function homePage(){
    let page = muix.Layout('linear', 'fillxy, vcenter')
    
    muix.Button(page, 'Hello World', 0.8).SetOnTouch(()=>{
        muix.SetTheme('dark')
    })
    
    muix.Fab(page, 'edit').SetOnTouch(()=>{
        muix.Snackbar('Hello World').Show()
    })
    
    muix.RadioButton(page, true)
    
    muix.CheckBox(page, false)
    
    muix.IconButton(page, 'book', 'filled')
    app.AddLayout(page)
}

function onThemeChanged(){
    alert('Yu')
}