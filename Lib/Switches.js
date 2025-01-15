/**
 * Add a switch to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
muix.Switch = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);

    let container = app.AddLayout(parent, "Card");
    container.SetCornerRadius(16);
    container.SetElevation(0.9);
    container.SetSize(52, 32, "dp");

    let abs_container = app.AddLayout(container, "Absolute");

    let handle = app.AddImage(abs_container, null, 0.085, 0.05);
    handle.SetAutoUpdate(true);

    function initiateHandleState(bool) {
        if (bool) {
            handle.SetPosition(0.06, 0);
            handle.DrawCircle(0.45, 0.45, 0.45);
        } else {
            handle.Scale(0.75, 0.75);
            handle.SetPosition(0, 0);
            handle.DrawCircle(0.45, 0.45, 0.45);
        }
    }

    function moveHandle(bool) {
        if (bool) {
            handle.Tween({ x: 0.0, y: 0, sw: 0.75, sh: 0.75 }, 100, "Sinusoidal.Out", 0, false, () => {
                handle.SetPaintColor(color.outline);
                handle.DrawCircle(0.45, 0.45, 0.45);
                handle.Update();
                isCheckedStatus.value = false;
            });
        } else {
            handle.Tween({ x: 0.06, y: 0, sw: 1, sh: 1 }, 100, "Back.Out", 0, false, () => {
                handle.SetPaintColor(color.primary);
                handle.DrawCircle(0.45, 0.45, 0.45);
                handle.Update();
                isCheckedStatus.value = true;
            });
        }
    }

    handle.SetOnTouchDown(() => moveHandle(isCheckedStatus.value));

    function applyStyling() {
        container.SetBackColor(color.surfaceContainerHighest);

        if (isCheckedStatus.value) {
            handle.SetPaintColor(color.primary);
            handle.DrawCircle(0.45, 0.45, 0.45);
            handle.Update();
        } else {
            handle.SetPaintColor(color.outline);
            handle.DrawCircle(0.45, 0.45, 0.45);
            handle.Update();
        }
    }

    isCheckedStatus.subscribe((status) => {
        if (container.data.onCheckHandler) container.data.onCheckHandler(status);
    });

    /**
     * when the switch is checked call a function
     * @param {} onCheckHandler
     */
    container.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        container.data.onCheckHandler = onCheckHandler;
    };

    globalThis.theme.subscribe(() => {
        applyStyling();
    });
    applyStyling();
    initiateHandleState(isChecked);

    return container;
}