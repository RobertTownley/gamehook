import * as THREE from "three";
import { normalizeXYZ } from "./utils";
import { isXYZArray } from "./guards";
import { isSpotLight } from "../lights/guards";
export function accelerateObjects(meshes) {
    Object.values(meshes).forEach(function (mesh) {
        if (!mesh.acceleration)
            return;
        var a = normalizeXYZ(mesh.acceleration);
        if (!mesh.velocity) {
            mesh.velocity = [0, 0, 0];
        }
        if (isXYZArray(mesh.velocity)) {
            mesh.velocity[0] += a[0];
            mesh.velocity[1] += a[1];
            mesh.velocity[2] += a[2];
        }
        else {
            mesh.velocity.x += a[0];
            mesh.velocity.y += a[1];
            mesh.velocity.z += a[2];
        }
    });
}
export function moveLights(lights, meshes) {
    Object.values(lights).forEach(function (light) {
        if (light.acceleration) {
            var a = normalizeXYZ(light.acceleration);
            if (!light.velocity) {
                light.velocity = [0, 0, 0];
            }
            if (isXYZArray(light.velocity)) {
                light.velocity[0] += a[0];
                light.velocity[1] += a[1];
                light.velocity[2] += a[2];
            }
            else {
                light.velocity.x += a[0];
                light.velocity.y += a[1];
                light.velocity.z += a[2];
            }
        }
        if (light.velocity) {
            var v = normalizeXYZ(light.velocity);
            light.threeLight.position.x += v[0];
            light.threeLight.position.y += v[1];
            light.threeLight.position.z += v[2];
        }
        if (light.rotation) {
            var r = normalizeXYZ(light.rotation);
            light.threeLight.rotation.x += r[0];
            light.threeLight.rotation.y += r[1];
            light.threeLight.rotation.z += r[2];
        }
        if (isSpotLight(light) && light.target) {
            var match = (function () {
                if (meshes[light.target]) {
                    return meshes[light.target].threeMesh;
                }
                else if (lights[light.target]) {
                    return lights[light.target].threeLight;
                }
                else {
                    return null;
                }
            })();
            if (match) {
                light.threeLight.target = match;
            }
        }
    });
}
export function moveObjects(meshes) {
    Object.values(meshes).forEach(function (mesh) {
        if (!mesh.velocity)
            return;
        var v = normalizeXYZ(mesh.velocity);
        mesh.threeMesh.position.x += v[0];
        mesh.threeMesh.position.y += v[1];
        mesh.threeMesh.position.z += v[2];
    });
}
export function rotateObjects(meshes) {
    Object.values(meshes).forEach(function (mesh) {
        if (!mesh.rotation)
            return;
        var r = normalizeXYZ(mesh.rotation);
        mesh.threeMesh.rotation.x += r[0];
        mesh.threeMesh.rotation.y += r[1];
        mesh.threeMesh.rotation.z += r[2];
    });
}
function getVertexesForObject(_a) {
    var _b, _c, _d;
    var threeMesh = _a.threeMesh;
    var bufferVertices = threeMesh.geometry.attributes.position.array;
    var vertices = [];
    for (var i = 0; i < bufferVertices.length; i += 3) {
        vertices.push(new THREE.Vector3((_b = bufferVertices[i] + threeMesh.position.x) !== null && _b !== void 0 ? _b : 0, (_c = bufferVertices[i + 1] + threeMesh.position.y) !== null && _c !== void 0 ? _c : 0, (_d = bufferVertices[i + 2] + threeMesh.position.z) !== null && _d !== void 0 ? _d : 0));
    }
    return vertices;
}
export function detectCollisions(meshes) {
    var meshList = Object.values(meshes);
    var collisionTargets = meshList.filter(function (m) { return m.collides || m.collidesWith; });
    var collisionSources = meshList.filter(function (m) { return m.onCollision; });
    if (!collisionSources.length || !collisionTargets.length)
        return;
    collisionSources.forEach(function (source) {
        // Get a filtered list of eligible targets
        var targets = collisionTargets.filter(function (t) {
            return t.collides || (t.collidesWith && t.collidesWith(source));
        });
        if (!targets.length)
            return;
        // Get a smaller list of all objects close enough to collide with
        if (!source.threeMesh.geometry.boundingSphere) {
            source.threeMesh.geometry.computeBoundingSphere();
        }
        var sRadius = source.threeMesh.geometry.boundingSphere.radius;
        var proximateTargets = targets.filter(function (t) {
            if (!t.threeMesh.geometry.boundingSphere) {
                t.threeMesh.geometry.computeBoundingSphere();
            }
            var tRadius = t.threeMesh.geometry.boundingSphere.radius;
            var maxCollisionDistance = sRadius + tRadius;
            return (source.threeMesh.position.distanceTo(t.threeMesh.position) <
                maxCollisionDistance);
        });
        if (!proximateTargets.length)
            return;
        // Determine if any of the objects in the collision list have collided
        for (var _i = 0, proximateTargets_1 = proximateTargets; _i < proximateTargets_1.length; _i++) {
            var t = proximateTargets_1[_i];
            var colliding = determineIfColliding(source, t);
            if (colliding) {
                var handler = source.onCollision;
                if (handler) {
                    handler({
                        collider: source,
                        collidedWith: t,
                        colliderLocation: source.threeMesh.position,
                        collidedWithLocation: t.threeMesh.position,
                    });
                }
            }
        }
    });
}
function determineIfColliding(mesh1, mesh2, threshold) {
    if (threshold === void 0) { threshold = 0.01; }
    var mesh1Vertexes = getVertexesForObject(mesh1);
    var mesh2Vertexes = getVertexesForObject(mesh2);
    for (var _i = 0, mesh1Vertexes_1 = mesh1Vertexes; _i < mesh1Vertexes_1.length; _i++) {
        var v1 = mesh1Vertexes_1[_i];
        for (var _a = 0, mesh2Vertexes_1 = mesh2Vertexes; _a < mesh2Vertexes_1.length; _a++) {
            var v2 = mesh2Vertexes_1[_a];
            var v2Index = mesh2Vertexes.indexOf(v2);
            if (v2Index < mesh2Vertexes.length) {
                var v3 = mesh2Vertexes[v2Index + 1];
                var triangle = new THREE.Triangle(v1, v2, v3);
                if (triangle.getArea() < threshold) {
                    return true;
                }
            }
        }
    }
    return false;
}
//# sourceMappingURL=keyframes.js.map