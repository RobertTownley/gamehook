import { ReactNode, useMemo } from "react";

import { BasicExample } from "./examples/Basic";
import { CameraExample } from "./examples/Camera";
import { ControlsExample } from "./examples/Controls";
import { PositionExample } from "./examples/Position";
import { MaterialExample } from "./examples/Material";
import { MovementExample } from "./examples/Movement";
import { LightingExample } from "./examples/Lighting";

const ExampleMap: Record<string, ReactNode> = {
  Basic: <BasicExample />,
  Position: <PositionExample />,
  Movement: <MovementExample />,
  Camera: <CameraExample />,
  Controls: <ControlsExample />,
  Material: <MaterialExample />,
  Lighting: <LightingExample />,
  Interaction: null,
  Materials: null,
  Models: null,
  Animation: null,
};
type ExampleName = keyof typeof ExampleMap;

function App() {
  const exampleName: ExampleName = "Material";
  const Example = useMemo(() => {
    return ExampleMap[exampleName];
  }, []);
  return <>{Example}</>;
}

export default App;
