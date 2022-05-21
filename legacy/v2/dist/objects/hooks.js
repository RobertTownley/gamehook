import * as THREE from "three";
import { useMemo, useEffect } from "react";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";
import { generateUUID } from "three/src/math/MathUtils";
export var useMaterial = function (gameObject, _a) {
    var material = _a.material;
    var _material = useMemo(function () {
        return createMaterial(material);
    }, [material]);
    var mesh = gameObject.three;
    useEffect(function () {
        mesh.material = _material;
    }, [gameObject, _material, mesh]);
};
export var useGeometry = function (gameObject, _a) {
    var geometry = _a.geometry;
    var _geometry = useMemo(function () {
        return createGeometry(geometry);
    }, [geometry]);
    var mesh = gameObject.three;
    useEffect(function () {
        mesh.geometry = _geometry;
    }, [gameObject, mesh, _geometry]);
};
export var useLocation = function (gameObject, _a) {
    var position = _a.position, orientation = _a.orientation;
    var _orientation = useMemo(function () {
        return orientation;
    }, [orientation]);
    var _position = useMemo(function () {
        return position;
    }, [position]);
    useEffect(function () {
        if (!_orientation)
            return;
        gameObject.three.rotation.set(_orientation.x, _orientation.y, _orientation.z);
    }, [gameObject, _orientation]);
    useEffect(function () {
        var _a = _position !== null && _position !== void 0 ? _position : { x: 0, y: 0, z: 0 }, x = _a.x, y = _a.y, z = _a.z;
        gameObject.three.position.set(x, y, z);
    }, [gameObject, _position]);
};
export var useParent = function (gameObject, _a) {
    var objParent = _a.objParent;
    useEffect(function () {
        if (objParent && objParent.three !== gameObject.three.parent) {
            if (gameObject.three.parent) {
                gameObject.three.removeFromParent();
            }
            objParent.three.add(gameObject.three);
        }
        return function () {
            gameObject.three.removeFromParent();
        };
    }, [gameObject, objParent]);
};
export var useLightParent = function (gameLight, _a) {
    var objParent = _a.objParent;
    useEffect(function () {
        if (objParent && objParent.three !== gameLight.three.parent) {
            if (gameLight.three.parent) {
                gameLight.three.removeFromParent();
            }
            objParent.three.add(gameLight.three);
        }
        return function () {
            gameLight.three.removeFromParent();
        };
    }, [gameLight, objParent]);
};
export var useEventListeners = function (gameObject, _a) {
    var onKeyUp = _a.onKeyUp, onKeyDown = _a.onKeyDown, onKeyPress = _a.onKeyPress, onClick = _a.onClick;
    useEffect(function () {
        gameObject.onClick = onClick;
    }, [gameObject, onClick]);
    useEffect(function () {
        gameObject.onKeyPress = onKeyPress;
    }, [gameObject, onKeyPress]);
    useEffect(function () {
        gameObject.onKeyDown = onKeyDown;
    }, [gameObject, onKeyDown]);
    useEffect(function () {
        gameObject.onKeyUp = onKeyUp;
    }, [gameObject, onKeyUp]);
};
export var useMount = function (gameObject) {
    // Mount object to scene
    useEffect(function () {
        var mounted = true;
        if (mounted) {
            _GAME.scene.addObjectToScene(gameObject);
        }
        return function () {
            mounted = false;
            _GAME.scene.removeObjectFromScene(gameObject);
        };
    }, [gameObject]);
};
export var useLightMount = function (gameLight) {
    useEffect(function () {
        var mounted = true;
        if (mounted) {
            _GAME.scene.addLightToScene(gameLight);
        }
        return function () {
            mounted = false;
            _GAME.scene.removeLightFromScene(gameLight);
        };
    }, [gameLight]);
};
export var useCollision = function (gameObject, _a) {
    var collides = _a.collides, onCollision = _a.onCollision;
    useEffect(function () {
        gameObject.onCollision = onCollision;
    }, [gameObject, onCollision]);
    useEffect(function () {
        gameObject.collides = collides;
    }, [gameObject, collides]);
};
export var useMovement = function (gameObject, _a) {
    var acceleration = _a.acceleration, rotation = _a.rotation, velocity = _a.velocity;
    useEffect(function () {
        gameObject.acceleration = acceleration;
    }, [gameObject, acceleration]);
    useEffect(function () {
        gameObject.rotation = rotation;
    }, [gameObject, rotation]);
    useEffect(function () {
        gameObject.velocity = velocity;
    }, [gameObject, velocity]);
};
export var useName = function (obj, _a) {
    var name = _a.name, labels = _a.labels;
    useEffect(function () {
        obj.name = name;
    }, [obj, name]);
    useEffect(function () {
        obj.labels = labels;
    }, [obj, labels]);
};
export var useGameMesh = function (gameObject, props) {
    useCollision(gameObject, props);
    useEventListeners(gameObject, props);
    useGeometry(gameObject, props);
    useLocation(gameObject, props);
    useMaterial(gameObject, props);
    useMount(gameObject);
    useName(gameObject, props);
    useParent(gameObject, props);
    useMovement(gameObject, props);
    // Return object for use in the component
    return gameObject;
};
export var useMesh = function (props) {
    var gameObject = useMemo(function () {
        var _a;
        return {
            type: "mesh",
            id: (_a = props.id) !== null && _a !== void 0 ? _a : generateUUID(),
            three: new THREE.Mesh(),
        };
    }, [props.id]);
    return useGameMesh(gameObject, props);
};
//# sourceMappingURL=hooks.js.map