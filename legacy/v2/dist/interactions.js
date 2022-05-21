import * as THREE from "three";
var KeyboardEventTypeMap = {
    keydown: "onKeyDown",
    keyup: "onKeyUp",
    keypress: "onKeyPress",
};
export var handleKeyboardEvent = function (event) {
    var eventType = KeyboardEventTypeMap[event.type];
    Object.values(_GAME.scene.gameObjects)
        .filter(function (o) { return o[eventType] !== undefined; })
        .forEach(function (obj) {
        var handler = obj[eventType];
        if (handler) {
            handler(event);
        }
    });
};
var MouseEventTypeMap = {
    click: "onClick",
};
export var handleMouseEvent = function (event) {
    event.preventDefault();
    var eventType = MouseEventTypeMap[event.type];
    var objects = Object.values(_GAME.scene.gameObjects).filter(function (o) {
        return o[eventType] !== undefined;
    });
    // Cast a ray to see which listening object the mouse click intersects with
    var mouse = getMouseVectorForEvent(event);
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, _GAME.scene.camera);
    var intersects = raycaster.intersectObjects(objects.map(function (i) {
        i.three.updateMatrixWorld();
        return i.three;
    }));
    if (!intersects.length)
        return;
    var selected = objects.find(function (i) { return i.three.uuid === intersects[0].object.uuid; });
    // Call the interacted element's event handler
    var handler = selected ? selected[eventType] : undefined;
    if (handler) {
        handler(event);
    }
};
export var getMouseVectorForEvent = function (event) {
    var renderer = _GAME.renderer;
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
    return mouse;
};
//# sourceMappingURL=interactions.js.map