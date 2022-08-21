import { useEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
export function createEvent(eventName) {
    return {
        name: eventName,
        emit: function (data) {
            this.listeners.forEach(function (_a) {
                var callback = _a.callback;
                callback(data);
            });
        },
        removeListener: function (id) {
            this.listeners = this.listeners.filter(function (l) { return l.id !== id; });
        },
        listeners: [],
    };
}
export function useEventListener(event, callback) {
    var id = useMemo(function () { return generateUUID(); }, []);
    useEffect(function () {
        event.listeners.push({
            callback: callback,
            id: id,
        });
        return function () {
            event.removeListener(id);
        };
    }, [event, callback, id]);
}
//# sourceMappingURL=index.js.map