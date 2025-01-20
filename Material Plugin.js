app.LoadScript('Material.js')

function OnStart() {
    app.ScaffoldMaterialTheme('light')
    homePage()
}


function homePage(){
    const Layout = muix.Layout('Linear', 'fillxy, vcenter')
    
    welcomeBtn = muix.Button('Hello World','Filled', Layout)
    welcomeBtn.SetSize(0.8, -1)
    welcomeBtn.SetOnTouch(()=>{
        if (muix.GetTheme() === 'light') muix.SetTheme('Dark')
        else muix.SetTheme('Light')
    })
    
    iconBtn = muix.IconButton('edit', 'Filled', Layout)
    iconBtn.SetIconStyle('outlined')
    iconBtn.SetOnTouch(function(){
        alert(muix.GetVersion())
    })
    
    prgLoader = muix.ProgressBar(50, 0.8, Layout)
    prgLoader.SetBarType('linear')
    app.AddLayout(Layout)
}

function onThemeChanged(){
    alert('Yu')
}