import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Scene, Text } from "../../gamehook";
export function InputsExample() {
    var handleChange = function (event) {
        console.log(event.key);
    };
    return (_jsxs(Scene, { children: [_jsx(Text, { value: "What is your name?", position: { x: 0, y: 3, z: 0 } }), _jsx(Input, { type: "text", placeholder: "Enter your name...", onChange: handleChange })] }));
}
//# sourceMappingURL=inputs.js.map