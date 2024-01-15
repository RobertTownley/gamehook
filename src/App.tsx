import { ReactNode, useMemo } from "react";
import { BasicExample } from "./examples/Basic";

const ExampleMap: Record<string, ReactNode> = {
  Basic: <BasicExample />,
};
function App() {
  const exampleName: keyof typeof ExampleMap = "Basic";
  const Example = useMemo(() => {
    return ExampleMap[exampleName];
  }, []);
  return <>{Example}</>;
}

export default App;
