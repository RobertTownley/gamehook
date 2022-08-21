import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Scene, Text, createEvent, useEventListener, } from "../../gamehook";
var sampleEvent = createEvent("Sample Event");
function Emitter() {
    var handleClick = function () {
        sampleEvent.emit({
            foo: "BAR 2",
        });
    };
    return _jsx(Box, { onClick: handleClick, position: { x: -5, y: 0, z: 0 } });
}
function Listener() {
    var RED = 0xff0000;
    var BLUE = 0x0000ff;
    var _a = useState(RED), color = _a[0], setColor = _a[1];
    useEventListener(sampleEvent, function (_data) {
        setColor(color === RED ? BLUE : RED);
    });
    return (_jsx(Box, { material: { type: "basic", color: color }, position: { x: 5, y: -2, z: 0 } }));
}
function ListenerTwo() {
    var RED = 0xff0000;
    var GREEN = 0x00ff00;
    var _a = useState(RED), color = _a[0], setColor = _a[1];
    useEventListener(sampleEvent, function (_data) {
        setColor(color === RED ? GREEN : RED);
    });
    return (_jsx(Box, { material: { type: "basic", color: color }, position: { x: 5, y: 2, z: 0 } }));
}
export function EventsExample() {
    return (_jsxs(Scene, { children: [_jsx(Emitter, {}), _jsx(Listener, {}), _jsx(ListenerTwo, {}), _jsx(Text, { value: "Click me", size: 1, position: { x: -5, y: -2, z: 0 }, height: 0.01 })] }));
}
//# sourceMappingURL=events.js.map