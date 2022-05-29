import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { buildChildren } from "./children";
import { createGeometry } from "./geometries";
import { useMesh } from "./hooks";
export var Box = function (props) {
    var width = props.width, height = props.height, depth = props.depth, children = props.children;
    var gameObject = useMesh(props);
    useEffect(function () {
        gameObject.three.geometry = createGeometry({
            type: "box",
            width: width,
            height: height,
            depth: depth,
        });
    }, [gameObject, width, height, depth]);
    return _jsx(_Fragment, { children: buildChildren(gameObject, children) }, void 0);
};
//# sourceMappingURL=box.js.map