import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { BasicExample } from "./examples/Basic";
const ExampleMap = {
    Basic: _jsx(BasicExample, {}),
};
function App() {
    const exampleName = "Basic";
    const Example = useMemo(() => {
        return ExampleMap[exampleName];
    }, []);
    console.log(Example);
    return _jsx(_Fragment, {});
}
export default App;
