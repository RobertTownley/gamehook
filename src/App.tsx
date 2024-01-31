import { ReactNode, useMemo } from "react";

import { BasicExample } from "./examples/Basic";
import { CameraExample } from "./examples/Camera";
import { PositionExample } from "./examples/Position";
import { MaterialExample } from "./examples/Material";
import { MovementExample } from "./examples/Movement";
import { LightingExample } from "./examples/Lighting";

const ExampleMap: Record<string, ReactNode> = {
  Basic: <BasicExample />,
  Position: <PositionExample />,
  Movement: <MovementExample />,
  Camera: <CameraExample />,
  Material: <MaterialExample />,
  Lighting: <LightingExample />,
  Interaction: null,
  Materials: null,
  Models: null,
  Animation: null,
};

function App() {
  const exampleName: keyof typeof ExampleMap = "Material";
  const Example = useMemo(() => {
    return ExampleMap[exampleName];
  }, []);
  return <>{Example}</>;
}

export default App;
