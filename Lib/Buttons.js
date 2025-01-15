
/**
 * Add a button to your view
 * @param {Dso-Layout} parent
 * @param {string} text
 * @param {number} width
 * @param {number} height
 * @param {string} type type of button to add
 */
muix.Button = function (parent,text, width, height, type) {
    let button = app.AddButton(parent, text, width, height, "Custom");
    const radius = 20;

    function applyStyling() {
        let btnColor = color.primary;
        switch (type) {
            case "filled":
                button.Batch({
                    SetStyle: [btnColor, btnColor, radius, null, 0, 0],
                    SetTextColor: [color.onPrimary],
                });
                break;

            case "text":
                button.Batch({
                    SetStyle: [btnColor, btnColor, radius, null, 0, 0],
                    SetTextColor: [color.primary],
                });
                break;

            case "outlined":
                button.Batch({
                    SetStyle: [color.background, color.background, radius, color.outline, 1, 0],
                    SetTextColor: [color.primary],
                });
                break;
                
                //default is tonal
            default:
                button.Batch({
                    SetStyle: [color.secondaryContainer, color.secondaryContainer, radius, null, 0, 0],
                    SetTextColor: [color.onSecondaryContainer],
                });
        }
    }

    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });

    return button;
}


/**
 * Add an icon button to your view.
 * @param {Ds-Layout} parent
 * @param {string} icon
 * @param {string} type filled | tonal | clear
 * @param {string} iconFill sharp | round | outlined | two-toned
 */
muix.IconButton = function (parent, icon, type, iconFill) {
    let btn = app.AddButton(parent, icon, null, null, "Custom");
    btn.SetSize(48, 48, "dp");
    btn.SetTextSize(24, "dp");

    if (iconFill) {
        btn.SetFontFile(returnProperIconFill());
    } else {
        btn.SetFontFile(globalThis.iconFill);
    }

    function returnProperIconFill() {
        switch (iconFill) {
            case "sharp":
                return prodFolder + "./Src/MaterialIcons-Sharp.otf";
                break;

            case "round":
                return prodFolder + "./Src/MaterialIcons-Round.otf";
                break;

            case "outlined":
                return prodFolder + "./Src/MaterialIcons-Outlined.otf";
                break;

            case "two-toned":
                return prodFolder + "./Src/MaterialIcons-TwoToned.otf";
                break;

            default:
                return prodFolder + "./Src/MaterialIcons-Regular.ttf";
        }
    }

    function applyStyling() {
        switch (type) {
            case "filled":
                btn.SetStyle(color.primary, color.primary, 24, null, null, 0);
                btn.SetTextColor(color.surfaceContainerHighest);

                break;

            case "tonal":
                btn.SetStyle(color.secondaryContainer, color.secondaryContainer, 24, null, null, 0);
                btn.SetTextColor(color.surfaceContainerHighest);
                break;

            case "clear":
                btn.SetStyle(color.background, color.background, 24, null, null, 0);
                btn.SetTextColor(color.inverseSurface);
                break;

            default:
                btn.SetStyle(color.background, color.background, 24, color.inverseSurface, 1, 0);
                btn.SetTextColor(color.inverseSurface);
        }
    }
    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });
    return btn;
}

/**
 * Add a radio button to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
muix.RadioButton = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    if (isChecked) {
        icon = "radio_button_checked";
    } else icon = "radio_button_unchecked";

    let btn = muix.IconButton(parent, icon, "clear", "sharp");
    btn.data.i = crypto.randomUUID()
    
    isCheckedStatus.subscribe((status) => {
        if (btn.data.onCheckHandler) btn.data.onCheckHandler(status);
        if (status) icon = "radio_button_checked";
        else icon = "radio_button_unchecked";
        btn.SetText(icon);
    });
    
    //Added I() To avoid callback optimization done 
    //by Ds
    btn.SetOnTouch(I(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    }));

    btn.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        btn.data.onCheckHandler = onCheckHandler;
    };
    return btn;
}

/**
 * Add a checkbox to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
muix.CheckBox = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    let btn = muix.IconButton(parent, "", "clear", "sharp");
    btn.data.i = crypto.randomUUID()
    
    if (isChecked === "disabled") {
        icon = "indeterminate_check_box";
        btn.SetText(icon);
        btn.SetEnabled(false);
    } else if (isChecked) {
        icon = "check_box";
        btn.SetText(icon);
    } else {
        icon = "check_box_outline_blank";
        btn.SetText(icon);
    }

    isCheckedStatus.subscribe((status) => {
        if (btn.data.onCheckHandler) btn.data.onCheckHandler(status);
        if (status) icon = "check_box";
        else icon = "check_box_outline_blank";
        btn.SetText(icon);
    });

    btn.SetOnTouch(I(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    }));

    btn.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        btn.data.onCheckHandler = onCheckHandler;
    };
    return btn;
}

/**
 * Add a Floating Action Button to your view.
 * @param {Ds-Layout} parent
 * @param {string} icon
 * @param {string} size small | large | medium
 */
muix.Fab = function (parent, icon = "edit", size) {
    let fab = app.AddButton(parent, icon, null, null, "Custom,Lego");
    fab.SetFontFile(globalThis.iconFill);

    // separated the styling configs to avoid unnecesary XML DOM Shifts.
    // remember these are permanent configurations unlike the colro of
    // the control as its reliant on theme property
    switch (size) {
        case "large":
            fab.SetSize(96, 96, "dp");
            fab.SetTextSize(36, "dp");
            break;

        case "small":
            fab.SetSize(40, 40, "dp");
            fab.SetTextSize(24, "dp");
            break;

        default:
            fab.SetSize(56, 56, "dp");
            fab.SetTextSize(24, "dp");
    }

    function applyStyling() {
        let btnColor = color.primaryContainer;
        let iconColor = color.onPrimaryContainer;
        switch (size) {
            case "large":
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 28, null, null, 0],
                });
                break;

            case "small":
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 12, null, null, 0],
                });
                break;

            default:
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 16, null, null, 0],
                });
        }
    }

    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });

    return fab;
}