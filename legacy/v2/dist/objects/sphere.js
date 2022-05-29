import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { buildChildren } from "./children";
import { createGeometry } from "./geometries";
import { useMesh } from "./hooks";
export var Sphere = function (props) {
    var children = props.children, heightSegments = props.heightSegments, widthSegments = props.widthSegments, radius = props.radius;
    var gameObject = useMesh(props);
    useEffect(function () {
        gameObject.three.geometry = createGeometry({
            type: "sphere",
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
        });
    }, [gameObject, heightSegments, widthSegments, radius]);
    return _jsx(_Fragment, { children: buildChildren(gameObject, children) }, void 0);
};
//# sourceMappingURL=sphere.js.map