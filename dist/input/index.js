var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "../container";
import { Text } from "../text";
/* TODO: This is an unhappy workaround that won't work for either a11y reasons or mobile
 * responsiveness. I need to find something better for inputs here */
export function Input(_a) {
    var activePlaceholder = _a.activePlaceholder, _b = _a.disabled, disabled = _b === void 0 ? false : _b, material = _a.material, maxLength = _a.maxLength, activeMaterial = _a.activeMaterial, hoveredMaterial = _a.hoveredMaterial, disablePointer = _a.disablePointer, placeholder = _a.placeholder, onChange = _a.onChange;
    var _c = useState(false), isActive = _c[0], setActive = _c[1];
    var _d = useState(false), hovered = _d[0], setHovered = _d[1];
    var _e = useState(""), value = _e[0], setValue = _e[1];
    var m = useMemo(function () {
        if (isActive && activeMaterial)
            return activeMaterial;
        if (hovered && hoveredMaterial)
            return hoveredMaterial;
        return material !== null && material !== void 0 ? material : { type: "normal" };
    }, [isActive, activeMaterial, hovered, hoveredMaterial, material]);
    var displayText = (function () {
        if (isActive && !value) {
            return activePlaceholder !== null && activePlaceholder !== void 0 ? activePlaceholder : "_____";
        }
        return value.length > 0 ? value : placeholder !== null && placeholder !== void 0 ? placeholder : "_____";
    })();
    var handleKey = useCallback(function (event) {
        if (["Enter", "Escape"].includes(event.key)) {
            setActive(false);
        }
        else if (isActive && !disabled) {
            setValue(function (current) { return getNewValue(event, current, maxLength); });
        }
        if (onChange) {
            onChange(event);
        }
    }, [isActive, disabled, onChange, maxLength]);
    var handleClick = useCallback(function () {
        if (!disabled) {
            setActive(true);
        }
    }, [disabled]);
    useEffect(function () {
        if (!disablePointer && !disabled) {
            document.body.style.cursor = hovered ? "pointer" : "auto";
        }
    }, [disablePointer, disabled, hovered]);
    return (_jsx(Container, __assign({ onHoverEnter: function () { return setHovered(true); }, onHoverLeave: function () { return setHovered(false); }, onClick: handleClick }, { children: _jsx(Text, { value: displayText, onKeyDown: handleKey, material: m }) })));
}
var ignoredKeys = [
    "Alt",
    "Control",
    "Enter",
    "Meta",
    "Shift",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Help",
    "Home",
    "PageUp",
    "PageDown",
];
function getNewValue(event, formerValue, maxLength) {
    if (ignoredKeys.includes(event.key)) {
        return formerValue;
    }
    else if (event.key === "Backspace") {
        return formerValue.slice(0, -1);
    }
    else if (event.key === "Delete") {
        return formerValue.slice(1);
    }
    else if (maxLength && formerValue.length >= maxLength) {
        return formerValue;
    }
    else {
        return formerValue + event.key;
    }
}
//# sourceMappingURL=index.js.map