import { useEffect, useMemo } from "react";
import { normalizeXYZ } from "./utils";
export function usePosition(mesh, position) {
    // Set mesh position
    useEffect(function () {
        var _a = normalizeXYZ(position), x = _a[0], y = _a[1], z = _a[2];
        mesh.position = position;
        mesh.threeMesh.position.set(x, y, z);
    }, [mesh, position]);
}
export function usePhysics(mesh, _a) {
    var acceleration = _a.acceleration, velocity = _a.velocity, orientation = _a.orientation, rotation = _a.rotation, onCollision = _a.onCollision, collides = _a.collides, collidesWith = _a.collidesWith, castShadow = _a.castShadow, receiveShadow = _a.receiveShadow;
    // Physics
    useEffect(function () {
        mesh.acceleration = normalizeXYZ(acceleration);
    }, [mesh, acceleration]);
    useEffect(function () {
        mesh.velocity = normalizeXYZ(velocity);
    }, [mesh, velocity]);
    var _b = useMemo(function () { return normalizeXYZ(orientation); }, [orientation]), xOrientation = _b[0], yOrientation = _b[1], zOrientation = _b[2];
    useEffect(function () {
        mesh.threeMesh.rotation.set(xOrientation, yOrientation, zOrientation);
    }, [mesh, xOrientation, yOrientation, zOrientation]);
    useEffect(function () {
        mesh.rotation = normalizeXYZ(rotation);
    }, [mesh, rotation]);
    useEffect(function () {
        mesh.onCollision = onCollision;
    }, [mesh, onCollision]);
    useEffect(function () {
        mesh.collides = collides;
        mesh.collidesWith = collidesWith;
    }, [mesh, collides, collidesWith]);
    useEffect(function () {
        mesh.castShadow = castShadow;
        mesh.threeMesh.castShadow = castShadow !== null && castShadow !== void 0 ? castShadow : false;
    }, [mesh, castShadow]);
    useEffect(function () {
        mesh.receiveShadow = receiveShadow;
        mesh.threeMesh.receiveShadow = receiveShadow !== null && receiveShadow !== void 0 ? receiveShadow : false;
    }, [mesh, receiveShadow]);
}
export function useCameraPhysics(camera, _a) {
    var acceleration = _a.acceleration, velocity = _a.velocity, orientation = _a.orientation, rotation = _a.rotation;
    useEffect(function () {
        camera.acceleration = acceleration;
    }, [camera, acceleration]);
    useEffect(function () {
        camera.velocity = velocity;
    }, [camera, velocity]);
    var _b = useMemo(function () { return normalizeXYZ(orientation); }, [orientation]), xOrientation = _b[0], yOrientation = _b[1], zOrientation = _b[2];
    useEffect(function () {
        camera.camera.rotation.set(xOrientation, yOrientation, zOrientation);
    }, [camera, xOrientation, yOrientation, zOrientation]);
    useEffect(function () {
        camera.rotation = normalizeXYZ(rotation);
    }, [camera, rotation]);
}
export function useLightPhysics(light, _a) {
    var acceleration = _a.acceleration, castShadow = _a.castShadow, velocity = _a.velocity, orientation = _a.orientation, rotation = _a.rotation;
    useEffect(function () {
        light.acceleration = acceleration;
    }, [light, acceleration]);
    useEffect(function () {
        light.velocity = velocity;
    }, [light, velocity]);
    var _b = useMemo(function () { return normalizeXYZ(orientation); }, [orientation]), xOrientation = _b[0], yOrientation = _b[1], zOrientation = _b[2];
    useEffect(function () {
        light.threeLight.rotation.set(xOrientation, yOrientation, zOrientation);
    }, [light, xOrientation, yOrientation, zOrientation]);
    useEffect(function () {
        light.rotation = normalizeXYZ(rotation);
    }, [light, rotation]);
    useEffect(function () {
        light.castShadow = castShadow;
        light.threeLight.castShadow = castShadow !== null && castShadow !== void 0 ? castShadow : false;
    }, [light, castShadow]);
}
export function useModelPhysics(model, _a) {
    var acceleration = _a.acceleration, growth = _a.growth, position = _a.position, scale = _a.scale, velocity = _a.velocity, orientation = _a.orientation, rotation = _a.rotation;
    useEffect(function () {
        if (model) {
            model.acceleration = acceleration;
        }
    }, [model, acceleration]);
    useEffect(function () {
        if (model) {
            model.velocity = velocity;
        }
    }, [model, velocity]);
    var _b = useMemo(function () {
        return normalizeXYZ(position);
    }, [position]), posX = _b[0], posY = _b[1], posZ = _b[2];
    useEffect(function () {
        if (model) {
            model.position = [posX, posY, posZ];
            model.gltf.scene.position.set(posX, posY, posZ);
        }
    }, [model, posX, posY, posZ]);
    useEffect(function () {
        if (model) {
            model.rotation = rotation;
        }
    }, [model, rotation]);
    var _c = useMemo(function () { return normalizeXYZ(orientation); }, [orientation]), xOrientation = _c[0], yOrientation = _c[1], zOrientation = _c[2];
    useEffect(function () {
        if (model) {
            model.gltf.scene.rotation.set(xOrientation, yOrientation, zOrientation);
        }
    }, [model, xOrientation, yOrientation, zOrientation]);
    useEffect(function () {
        if (model) {
            model.orientation = orientation;
        }
    }, [model, orientation]);
    // Size
    useEffect(function () {
        if (model) {
            model.growth = growth ? normalizeXYZ(growth) : [0, 0, 0];
        }
    }, [model, growth]);
    var _d = useMemo(function () {
        return scale ? normalizeXYZ(scale) : [1, 1, 1];
    }, [scale]), xSize = _d[0], ySize = _d[1], zSize = _d[2];
    useEffect(function () {
        if (model) {
            model.gltf.scene.scale.set(xSize, ySize, zSize);
        }
    }, [model, xSize, ySize, zSize]);
}
//# sourceMappingURL=hooks.js.map