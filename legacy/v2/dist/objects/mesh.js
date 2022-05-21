import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { buildChildren } from "./children";
import { useMesh } from "./hooks";
export var Mesh = function (props) {
    var children = props.children;
    var gameObject = useMesh(props);
    // TODO: Observe other things like collisions, position, and clicks
    return _jsx(_Fragment, { children: buildChildren(gameObject, children) }, void 0);
};
//# sourceMappingURL=mesh.js.map