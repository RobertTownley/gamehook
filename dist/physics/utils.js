export function normalizeXYZ(values) {
    if (!values) {
        return [0, 0, 0];
    }
    if (Array.isArray(values)) {
        return values;
    }
    return [values.x, values.y, values.z];
}
//# sourceMappingURL=utils.js.map