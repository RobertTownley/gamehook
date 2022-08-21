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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Animation, Audio, Camera, Light, Model, Scene, Text, } from "../../gamehook";
export function AudioExample() {
    var _a = useState("Playing campfire noise"), audioState = _a[0], setAudioState = _a[1];
    var campfireDuration = 3;
    return (_jsxs(Scene, { children: [_jsx(Audio, { filepath: "/resources/audio/campfire.flac", volume: 0.5, onEnded: function () {
                    setAudioState("Finished after ".concat(campfireDuration, " seconds"));
                }, duration: campfireDuration }), _jsx(Camera, { position: { x: 0, y: 1, z: 3 }, trackTo: "campfire" }), _jsx(Light, { type: "ambient" }), _jsx(Model, __assign({ id: "campfire", filepath: "/resources/campfire/scene.gltf" }, { children: _jsx(Animation, { name: "fire armAction", loop: true }) })), _jsx(Text, { value: "Status: ".concat(audioState), size: 0.5, position: { x: 0, y: 1.5, z: -2 }, height: 0.001 })] }));
}
//# sourceMappingURL=audio.js.map