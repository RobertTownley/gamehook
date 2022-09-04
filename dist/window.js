export function convertCSSMeasureToPixels(measure, dimension, sceneId) {
    var _a;
    if (!measure) {
        return undefined;
    }
    else if (typeof measure === "number") {
        return measure;
    }
    else if (measure.endsWith("px")) {
        return parseInt(measure.replace("px", ""), 10);
    }
    else if (measure.endsWith("vw")) {
        var value = parseInt(measure.replace("vw", ""), 10);
        return window.innerWidth * (value / 100);
    }
    else if (measure.endsWith("vh")) {
        var value = parseInt(measure.replace("vh", ""), 10);
        return window.innerHeight * (value / 100);
    }
    else if (measure.endsWith("%")) {
        var value = parseInt(measure.replace("%", ""), 10);
        var parent_1 = (_a = document.getElementById(sceneId)) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent_1) {
            return 0;
        }
        var parentDimension = dimension === "width" ? parent_1.offsetWidth : parent_1.offsetHeight;
        return (value / 100) * parentDimension;
    }
    else {
        throw new Error("Could not convert value ".concat(measure, " to pixels"));
    }
}
//# sourceMappingURL=window.js.map