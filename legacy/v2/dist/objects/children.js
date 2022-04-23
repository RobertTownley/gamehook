import { Children, cloneElement, isValidElement } from "react";
export var buildChildren = function (gameMesh, children) {
    return Children.map(children, function (child) {
        return isValidElement(child)
            ? cloneElement(child, { objParent: gameMesh })
            : null;
    });
};
//# sourceMappingURL=children.js.map