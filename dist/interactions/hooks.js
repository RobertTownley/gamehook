var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as THREE from "three";
import { useLayoutEffect } from "react";
import { KeyboardEventTypeMap, MouseEventTypeMap } from "./types";
export function useInteraction(meshes, renderer, camera) {
    useLayoutEffect(function () {
        function handleMouseMoveEvent(event) {
            var interactables = __spreadArray([], Object.values(meshes), true).filter(function (obj) {
                return (obj["onHoverLeave"] !== undefined || obj["onHoverEnter"] !== undefined);
            });
            var mouse = getMouseVectorForEvent(event, renderer);
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(interactables.map(function (i) {
                i.threeMesh.updateMatrixWorld();
                return i.threeMesh;
            }));
            // Determine if any objects with current active hover states aren't being hovered over
            var activeObjects = __spreadArray([], Object.values(meshes).filter(function (o) { return o.hoverState === "active"; }), true);
            var intersectIds = intersects.map(function (i) { return i.object.uuid; });
            activeObjects.forEach(function (activeObject) {
                if (!intersectIds.includes(activeObject.threeMesh.uuid)) {
                    activeObject.hoverState = "inactive";
                    var handler_1 = activeObject["onHoverLeave"];
                    if (handler_1) {
                        handler_1(event);
                    }
                }
            });
            if (intersects.length < 1)
                return;
            var mesh = interactables.find(function (m) {
                return m.threeMesh.uuid === intersects[0].object.uuid;
            });
            if (!mesh) {
                return;
            }
            var handler = (function () {
                if (!mesh)
                    return;
                if (mesh["onHoverEnter"] && mesh.hoverState !== "active") {
                    mesh.hoverState = "active";
                    return mesh["onHoverEnter"];
                }
                else {
                    return undefined;
                }
            })();
            if (handler) {
                handler(event);
            }
        }
        function handleMouseEvent(event) {
            // Get a list of all objects listening for this mouse event
            var eventType = MouseEventTypeMap[event.type];
            var interactables = __spreadArray([], Object.values(meshes), true).filter(function (obj) {
                return obj[eventType] !== undefined;
            });
            if (!interactables)
                return;
            // Cast a ray to see which listening object the mouse click intersects with
            var mouse = getMouseVectorForEvent(event, renderer);
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(interactables.map(function (i) {
                i.threeMesh.updateMatrixWorld();
                return i.threeMesh;
            }));
            if (intersects.length < 1)
                return;
            // Find the first mesh to be selected
            var mesh = interactables.find(function (m) {
                return m.threeMesh.uuid === intersects[0].object.uuid;
            });
            var handler = mesh ? mesh[eventType] : undefined;
            if (handler) {
                handler(event);
            }
        }
        function handleKeyboardEvent(event) {
            var eventType = KeyboardEventTypeMap[event.type];
            Object.values(meshes).forEach(function (mesh) {
                if (!mesh[eventType])
                    return;
                var handler = mesh[eventType];
                if (handler) {
                    handler(event);
                }
            });
        }
        window.addEventListener("click", handleMouseEvent);
        window.addEventListener("mousemove", handleMouseMoveEvent);
        window.addEventListener("keypress", handleKeyboardEvent);
        return function () {
            window.removeEventListener("click", handleMouseEvent);
            window.removeEventListener("keypress", handleKeyboardEvent);
        };
    }, [camera, meshes, renderer]);
}
export var getMouseVectorForEvent = function (event, renderer) {
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
    return mouse;
};
//# sourceMappingURL=hooks.js.map