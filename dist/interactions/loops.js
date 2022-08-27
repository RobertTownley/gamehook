import * as THREE from "three";
var mouseX = 0;
var mouseY = 0;
document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});
var raycaster = new THREE.Raycaster();
export function detectHoverEntries(meshes, camera, renderer) {
    var hoverables = Object.values(meshes).filter(function (m) {
        return ((m.onHoverLeave && m.hoverState === "active") ||
            (m.onHoverEnter && m.hoverState !== "active"));
    });
    if (hoverables.length < 1)
        return;
    // Detect objects hovered into
    var mouse = new THREE.Vector2();
    mouse.x = (mouseX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(mouseY / renderer.domElement.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera.camera);
    var intersects = raycaster.intersectObjects(hoverables.map(function (h) {
        h.threeMesh.updateMatrixWorld();
        return h.threeMesh;
    }));
    var firstHoverable = hoverables.find(function (h) { var _a; return h.threeMesh.uuid === ((_a = intersects[0]) === null || _a === void 0 ? void 0 : _a.object.uuid); });
    if (firstHoverable &&
        firstHoverable.hoverState !== "active" &&
        firstHoverable.onHoverEnter) {
        firstHoverable.hoverState = "active";
        firstHoverable.onHoverEnter();
    }
    // Detect hover exits
    var intersectIds = intersects.map(function (i) { return i.object.uuid; });
    var exitables = hoverables.filter(function (h) {
        return h.onHoverLeave !== undefined &&
            h.hoverState === "active" &&
            !intersectIds.includes(h.threeMesh.uuid);
    });
    exitables.forEach(function (exitable) {
        if (exitable.onHoverLeave) {
            exitable.hoverState = "inactive";
            exitable.onHoverLeave();
        }
    });
}
//# sourceMappingURL=loops.js.map