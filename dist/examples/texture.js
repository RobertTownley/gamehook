import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Light, Scene } from "../../gamehook";
export function TextureExample() {
    return (_jsxs(Scene, { children: [_jsx(Box, { width: 5, height: 5, depth: 5, rotation: { x: 0.01, y: 0.01, z: 0.01 }, material: {
                    type: "standard",
                    textures: {
                        colorMap: "https://r105.threejsfundamentals.org/threejs/resources/images/wall.jpg",
                    },
                } }), _jsx(Light, { type: "ambient" })] }));
}
//# sourceMappingURL=texture.js.map