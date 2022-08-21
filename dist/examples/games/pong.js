import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import _ from "lodash";
import { Box, Sphere, Camera, generateUUID, Scene, } from "../../../gamehook";
function Paddle() {
    var _a = useState(0), x = _a[0], setX = _a[1];
    function movePaddle(event) {
        if (event.key === "a") {
            setX(x - 0.2);
        }
        else if (event.key === "d") {
            setX(x + 0.2);
        }
    }
    return (_jsx(Box, { name: "paddle", onKeypress: movePaddle, position: { x: x, y: -8, z: 0 }, width: 5, depth: 0.5, collides: true }));
}
export function Pong() {
    var rateOfMovement = 0.05;
    var _a = useState({
        x: 0,
        y: rateOfMovement,
        z: 0,
    }), ballVelocity = _a[0], setBallVelocity = _a[1];
    var _b = useState(_.range(0, 50).map(function (_i) { return ({
        position: [_.random(-15, 15), _.random(2, 9), 0],
        id: generateUUID(),
    }); })), bricks = _b[0], setBricks = _b[1];
    var onBallCollision = function (_a) {
        var collidedWith = _a.collidedWith, colliderLocation = _a.colliderLocation, collidedWithLocation = _a.collidedWithLocation;
        // Remove collided bricks
        var newBricks = bricks.filter(function (p) { return collidedWith.id !== p.id; });
        setBricks(newBricks);
        // Change ball direction
        var newVelocity = (function () {
            if (collidedWith.name === "paddle") {
                var newX = (colliderLocation.x - collidedWithLocation.x) / 100;
                return { x: newX, y: rateOfMovement, z: 0 };
            }
            else if (collidedWith.name === "brick") {
                return { x: ballVelocity.x, y: 0 - rateOfMovement, z: 0 };
            }
            else {
                throw new Error("Unknown collision: ".concat(collidedWith.name));
            }
        })();
        setBallVelocity(newVelocity);
    };
    return (_jsxs(Scene, { children: [bricks.map(function (_a) {
                var position = _a.position, id = _a.id;
                return (_jsx(Box, { id: id, position: position, width: 1.5, height: 0.5, depth: 1, collides: true, name: "brick" }, id));
            }), _jsx(Sphere, { position: { x: 0, y: -5, z: 0 }, velocity: ballVelocity, onCollision: onBallCollision, name: "ball", id: "ball" }), _jsx(Paddle, {}), _jsx(Camera, { position: { x: 0, y: 0, z: 10 }, trackTo: "ball" })] }));
}
//# sourceMappingURL=pong.js.map