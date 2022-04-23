import * as THREE from "three";
import { isMesh } from "../objects/guards";
var COLLISION_SENSITIVITY = 0.1;
export var detectCollisions = function () {
    // Form a list of collidable objects and the objects they can collide with
    var gameObjects = Object.values(_GAME.scene.gameObjects);
    var colliders = gameObjects
        .filter(function (o) { return o.onCollision !== undefined; })
        .filter(function (o) { return isMesh(o.three); });
    var collidables = gameObjects
        .filter(function (o) { return o.collides; })
        .filter(function (o) { return isMesh(o.three); });
    // For each collider, detect whether they have any active collisions
    colliders.forEach(function (c1) {
        var collided = false;
        var c1center = getCenterPoint(c1);
        if (!c1center)
            return;
        var raycaster = new THREE.Raycaster(c1center);
        var dir = new THREE.Vector3();
        var c1vertices;
        var c1radius = c1.three.geometry.boundingSphere.radius;
        for (var _i = 0, collidables_1 = collidables; _i < collidables_1.length; _i++) {
            var c2 = collidables_1[_i];
            var c2center = getCenterPoint(c2);
            if (!c2center)
                continue;
            var c2radius = c2.three.geometry.boundingSphere.radius;
            // On first sweep, detect whether they're close enough to collide
            var centerDistance = c1radius + c2radius;
            if (c1center.distanceTo(c2center) > centerDistance)
                continue;
            // Determine which object is smaller, and cast rays from that object.
            // This is because a smaller object is less likely to slip through
            // the cracks of intersection with a larger one
            var collision = undefined;
            var collisionDistance = COLLISION_SENSITIVITY;
            if (c1radius <= c2radius) {
                // Lazily compute vertices for objects
                if (!c1vertices) {
                    c1vertices = getVerticesForObject(c1);
                }
                for (var _a = 0, c1vertices_1 = c1vertices; _a < c1vertices_1.length; _a++) {
                    var vertex = c1vertices_1[_a];
                    var distance = dir.subVectors(vertex, c1center).normalize();
                    raycaster.set(c1center, distance);
                    var intersections = raycaster.intersectObject(c2.three);
                    if (intersections.length &&
                        intersections[0].distance < collisionDistance) {
                        collision = {
                            self: c1,
                            target: c2,
                            intersections: intersections,
                        };
                        collided = true;
                    }
                }
            }
            else {
                for (var _b = 0, _c = getVerticesForObject(c2); _b < _c.length; _b++) {
                    var vertex = _c[_b];
                    var distance = dir.subVectors(vertex, c2center).normalize();
                    raycaster.set(c2center, distance);
                    var intersections = raycaster.intersectObject(c1.three);
                    if (intersections.length) {
                        collision = {
                            self: c1,
                            target: c2,
                            intersections: intersections,
                        };
                        collided = true;
                    }
                }
            }
            if (collision && c1.onCollision) {
                c1.onCollision(collision);
                return;
            }
        }
        if (collided) {
            return;
        }
    });
};
var getCenterPoint = function (gameMesh) {
    if (!isMesh(gameMesh.three))
        return undefined;
    if (!gameMesh.three.geometry.boundingSphere) {
        gameMesh.three.geometry.computeBoundingSphere();
    }
    var position = gameMesh.three.position;
    return new THREE.Vector3(position.x, position.y, position.z);
};
var getVerticesForObject = function (obj) {
    var _a, _b, _c;
    var bufferVertices = obj.three.geometry.attributes.position.array;
    var vertices = [];
    for (var i = 0; i < bufferVertices.length; i += 3) {
        vertices.push(new THREE.Vector3((_a = bufferVertices[i] + obj.three.position.x) !== null && _a !== void 0 ? _a : 0, (_b = bufferVertices[i + 1] + obj.three.position.y) !== null && _b !== void 0 ? _b : 0, (_c = bufferVertices[i + 2] + obj.three.position.z) !== null && _c !== void 0 ? _c : 0));
    }
    return vertices;
};
//# sourceMappingURL=collisions.js.map