
function Log(message, issueLink){
    const separator = "==============================================";

    console.log("<div style='color: red'>" + separator );
    console.log("<div style='color: red'>" + message);
    console.log(`<a style='color: blue' target='_blank' href=${issueLink}>View a Fix.</a>`)
    console.log("<div style='color: red'>" + separator );
}

/**
 * create a reactive value, that responds to a change in its
 * value by firing the subscribed function to changes.
 * it sends down the new value into the subscriber function.
 * @param {any} defaultValue 
 */
function signal(defaultValue) {
    let internalValue = defaultValue;
    let subscriptions = [];

    function notifySubscribers() {
        subscriptions.forEach((fn) => fn(internalValue));
    }

    return {
        get value() {
            return internalValue;
        },
        set value(newValue) {
            internalValue = newValue;
            notifySubscribers();
        },
        subscribe(fn) {
            subscriptions.push(fn);
        },
    };
}


function useDefaultTheme() {
    globalThis.usingDefault = true;
    const fileContent = `{
        "schemes": {
            "light": {
                "primary": "#4C662B",
                "surfaceTint": "#4C662B",
                "onPrimary": "#FFFFFF",
                "primaryContainer": "#CDEDA3",
                "onPrimaryContainer": "#102000",
                "secondary": "#586249",
                "onSecondary": "#FFFFFF",
                "secondaryContainer": "#DCE7C8",
                "onSecondaryContainer": "#151E0B",
                "tertiary": "#386663",
                "onTertiary": "#FFFFFF",
                "tertiaryContainer": "#BCECE7",
                "onTertiaryContainer": "#00201E",
                "error": "#BA1A1A",
                "onError": "#FFFFFF",
                "errorContainer": "#FFDAD6",
                "onErrorContainer": "#410002",
                "background": "#F9FAEF",
                "onBackground": "#1A1C16",
                "surface": "#F9FAEF",
                "onSurface": "#1A1C16",
                "surfaceVariant": "#E1E4D5",
                "onSurfaceVariant": "#44483D",
                "outline": "#75796C",
                "outlineVariant": "#C5C8BA",
                "shadow": "#000000",
                "scrim": "#000000",
                "inverseSurface": "#2F312A",
                "inverseOnSurface": "#F1F2E6",
                "inversePrimary": "#B1D18A",
                "primaryFixed": "#CDEDA3",
                "onPrimaryFixed": "#102000",
                "primaryFixedDim": "#B1D18A",
                "onPrimaryFixedVariant": "#354E16",
                "secondaryFixed": "#DCE7C8",
                "onSecondaryFixed": "#151E0B",
                "secondaryFixedDim": "#BFCBAD",
                "onSecondaryFixedVariant": "#404A33",
                "tertiaryFixed": "#BCECE7",
                "onTertiaryFixed": "#00201E",
                "tertiaryFixedDim": "#A0D0CB",
                "onTertiaryFixedVariant": "#1F4E4B",
                "surfaceDim": "#DADBD0",
                "surfaceBright": "#F9FAEF",
                "surfaceContainerLowest": "#FFFFFF",
                "surfaceContainerLow": "#F3F4E9",
                "surfaceContainer": "#EEEFE3",
                "surfaceContainerHigh": "#E8E9DE",
                "surfaceContainerHighest": "#E2E3D8"
            }
        }
    }`;
    globalThis.fileObject = JSON.parse(fileContent);
}