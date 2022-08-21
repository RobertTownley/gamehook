import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { usePosition, usePhysics } from "../physics/hooks";
import { useAddToScene } from "../mount";
// Add object to scene on mount, remove on dismount
export function useMesh(props) {
    var position = props.position, threeMesh = props.threeMesh, onClick = props.onClick, onKeypress = props.onKeypress, onHoverEnter = props.onHoverEnter, onHoverLeave = props.onHoverLeave, id = props.id, attrs = props.attrs, name = props.name, tags = props.tags;
    var mesh = useMemo(function () {
        return {
            id: id !== null && id !== void 0 ? id : generateUUID(),
            threeMesh: threeMesh !== null && threeMesh !== void 0 ? threeMesh : new THREE.Mesh(),
        };
    }, [id, threeMesh]);
    usePhysics(mesh, props);
    usePosition(mesh, position);
    // Interaction
    useEffect(function () {
        mesh.onClick = onClick;
    }, [mesh, onClick]);
    useEffect(function () {
        mesh.onKeypress = onKeypress;
    }, [mesh, onKeypress]);
    useEffect(function () {
        mesh.onHoverEnter = onHoverEnter;
    }, [mesh, onHoverEnter]);
    useEffect(function () {
        mesh.onHoverLeave = onHoverLeave;
    }, [mesh, onHoverLeave]);
    // Notation
    useEffect(function () {
        mesh.attrs = attrs;
        mesh.name = name;
        mesh.tags = tags;
    }, [mesh, attrs, name, tags]);
    useAddToScene(mesh);
    return mesh;
}
// Create geometry for object
export function useGeometry(mesh, geometry) {
    useEffect(function () {
        mesh.threeMesh.geometry = geometry;
    }, [mesh.threeMesh, geometry]);
}
//# sourceMappingURL=hooks.js.map