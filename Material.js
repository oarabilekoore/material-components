// Material Design 3 Library / Plugin For DroidScript
// @Author: Oarabile Koore

/********************************************************************

                                                            *********
                                                              /\  /\
                                                              \ \/ /
                                                               \  /
   Under The ZLib License.                                      \/
   @2024 - Present, Built With Love From Botswana.          *********
********************************************************************/


let pluginFolder = app.GetPrivateFolder("Plugins") + "/material/";
let debugFolder = app.GetAppPath().endsWith("/Material Plugin");
let prodFolder = debugFolder ? "" : pluginFolder;

const muix = {}
const pluginVersion = '2.0.1';

app.LoadScript('Lib/Helpers.js')
app.LoadScript('Lib/Buttons.js')
app.LoadScript('Lib/Loaders.js')
app.LoadScript('Lib/Switches.js')
app.LoadScript('Lib/Snackbars.js')


/**
 * ScaffoldAppTheme function lets you predefine variables like 
 * theme and icon types to be used.
 * @param {string} theme dark | light | light-high-contrast 
 * @param {string} iconFill sharp | round | outlined | two-toned
 */
app.ScaffoldMaterialTheme = function (theme = "light", iconFill = "outlined") {
    if (!app.FileExists("./Src/material-theme.json")) {
        useDefaultTheme();
    } else {
        globalThis.fileContent = app.ReadFile("./Src/material-theme.json");
        fileObject = JSON.parse(fileContent);
    }

    globalThis.color = {};
    globalThis.theme = signal();

    switch (iconFill) {
        case "sharp":
            globalThis.iconFill = prodFolder + "Src/MaterialIcons-Sharp.otf";
            break;

        case "round":
            globalThis.iconFill = prodFolder + "Src/MaterialIcons-Round.otf";
            break;

        case "outlined":
            globalThis.iconFill = prodFolder + "Src/MaterialIcons-Outlined.otf";
            break;

        case "two-toned":
            globalThis.iconFill = prodFolder + "Src/MaterialIcons-TwoToned.otf";
            break;

        default:
            globalThis.iconFill = prodFolder + "Src/MaterialIcons-Regular.ttf";
    }
    
    function applyNavigationalColors(){        
    const statusBarColor = fileObject?.schemes?.dark?.surface;
        
        if (statusBarColor === null || statusBarColor === undefined) {
           Log`The status bar color is not defined. Please check your
           configuration.`
           return;
        }

        app.SetStatusBarColor(fileObject?.schemes?.dark?.surface)
        app.SetNavBarColor(color.background)
        app.SetBackColor(color.background)
    }
    
    
    // Update theme and notify subscribers
    globalThis.theme.subscribe(() => {
        
        const selectedColors = fileObject?.schemes[globalThis.theme.value];
        Object.entries(selectedColors).forEach(([key, value]) => {
            color[key] = value;
        });
        applyNavigationalColors()
    });
    if (globalThis.usingDefault) globalThis.theme.value = "light";
    else globalThis.theme.value = theme || "light";    
};

/**
 * Switch between themes dynamically without app restart
 * @param {string} theme
 */
muix.SetTheme = function (theme) {
    
    if (globalThis.usingDefault) {
        Log(`You are not able to change themes because
        you did not set-up the app theme file.`, 'https://droidscript.org')
        return;
    }
    app.Hide(), globalThis.theme.value = theme.toLocaleLowerCase();
    app.Show();
};

/**
 * Get the value of the current theme
 */
muix.GetTheme = function () {
    return globalThis.theme.value;
}

/**
 * Get the version of the plugin
 */
muix.GetVersion = function () {
    return pluginVersion;
}

/**
 * Create a DroidScript Layout
 * @param {string} type
 * @param {string} options
 * @returns mduiLayout
 */
muix.Layout = function (type, options, properties) {
    let layout = app.CreateLayout(type, options);

    layout.SetBackColor(color.background);

    globalThis.theme.subscribe(() => {
        layout.SetBackColor(color.background);
    });

    return layout;
}