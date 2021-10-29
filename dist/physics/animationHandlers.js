// Rotate all objects that have a rotation attribute set
export var rotateObjects = function () {
    Object.values(_GAME.scene.gameObjects)
        .filter(function (gameObject) { return gameObject.rotation !== undefined; })
        .forEach(function (gameObject) {
        if (!gameObject.rotation)
            return;
        var _a = gameObject.rotation, x = _a.x, y = _a.y, z = _a.z;
        if (x)
            gameObject.three.rotateX(x);
        if (y)
            gameObject.three.rotateY(y);
        if (z)
            gameObject.three.rotateZ(z);
    });
};
export var moveObjects = function () {
    Object.values(_GAME.scene.gameObjects)
        .filter(function (gameObject) { return gameObject.velocity !== undefined; })
        .forEach(function (gameObject) {
        if (!gameObject.velocity)
            return;
        var _a = gameObject.velocity, x = _a.x, y = _a.y, z = _a.z;
        if (x)
            gameObject.three.position.x += x;
        if (y)
            gameObject.three.position.y += y;
        if (z)
            gameObject.three.position.z += z;
    });
};
export var accelerateObjects = function () {
    Object.values(_GAME.scene.gameObjects)
        .filter(function (gameObject) { return gameObject.acceleration !== undefined; })
        .forEach(function (gameObject) {
        if (!gameObject.acceleration)
            return;
        if (!gameObject.velocity) {
            gameObject.velocity = {
                x: 0,
                y: 0,
                z: 0,
            };
        }
        var _a = gameObject.acceleration, x = _a.x, y = _a.y, z = _a.z;
        if (x)
            gameObject.velocity.x += x;
        if (y)
            gameObject.velocity.y += y;
        if (z)
            gameObject.velocity.z += z;
    });
};
//# sourceMappingURL=animationHandlers.js.map