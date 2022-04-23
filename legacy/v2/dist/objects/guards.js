export var isGroup = function (three) {
    return three.type === "Group";
};
export var isMesh = function (three) {
    return three.type === "Mesh";
};
export var isBufferGeometry = function (opt) {
    return opt.type === "BufferGeometry";
};
//# sourceMappingURL=guards.js.map