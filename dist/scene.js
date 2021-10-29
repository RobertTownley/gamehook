import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { useGame } from "./game";
import { accelerateObjects, moveObjects, rotateObjects, } from "./physics/animationHandlers";
import { detectCollisions } from "./physics/collisions";
var DEFAULT_BACKGROUND_COLOR = 0x000000;
export var Scene = function (props) {
    var children = props.children, backgroundColor = props.backgroundColor;
    var _a = useState(false), initialized = _a[0], setInitialized = _a[1];
    var game = useGame();
    useEffect(function () {
        var mounted = true;
        if (mounted) {
            game.scene = buildScene();
            game.scene.three.background = new THREE.Color(backgroundColor || DEFAULT_BACKGROUND_COLOR);
            setInitialized(true);
        }
        return function () {
            mounted = false;
        };
    }, [backgroundColor, game]);
    // Render the scene and perform required animations
    useEffect(function () {
        var animate = function () {
            game.renderer.render(game.scene.three, game.scene.camera);
            requestAnimationFrame(animate);
            // Animate callbacks created within `useAnimation`
            Object.values(game.scene.animations)
                .filter(function (animation) { return !animation.current.revoked; })
                .forEach(function (animation) {
                var result = animation.current.callback();
                if (result) {
                    delete game.scene.animations[animation.current.id];
                }
            });
            // Handle object physics
            detectCollisions();
            rotateObjects();
            moveObjects();
            accelerateObjects();
        };
        animate();
    }, [game.renderer, game.scene]);
    // Delay rendering of child components to avoid having them render
    // before the scene completes its useLayoutEffect, and add themselves
    // to the scene that's about to be removed
    return initialized ? _jsx(_Fragment, { children: children }, void 0) : _jsx(_Fragment, {}, void 0);
};
// This is the scene that renders before the reactive elements have
// taken hold and replaced the scene with a new scene object
export var buildScene = function () {
    var scene = {
        animations: {},
        camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        gameObjects: {},
        gameLights: {},
        id: generateUUID(),
        three: new THREE.Scene(),
        // Methods
        addObjectToScene: function (gameObject) {
            this.three.add(gameObject.three);
            this.gameObjects[gameObject.id] = gameObject;
        },
        addLightToScene: function (gameLight) {
            this.three.add(gameLight.three);
            this.gameLights[gameLight.id] = gameLight;
        },
        removeLightFromScene: function (gameLight) {
            this.three.remove(gameLight.three);
            delete this.gameLights[gameLight.id];
        },
        removeObjectFromScene: function (gameObject) {
            this.three.remove(gameObject.three);
            delete this.gameObjects[gameObject.id];
        },
    };
    // TODO: Replace with an actual camera API
    scene.camera.position.z = 5;
    return scene;
};
export var initialScene = buildScene();
export var useScene = function () {
    var game = useGame();
    return game.scene;
};
//# sourceMappingURL=scene.js.map