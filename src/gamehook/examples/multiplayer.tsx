import { Box, Scene } from "../../gamehook";

import { useConnection, useSharedState } from "./lib";

interface ExampleState {
  count: number;
  message: string;
}

export function MultiplayerExample() {
  const connection = useConnection();

  const [exampleState, setExampleState] = useSharedState<ExampleState>(
    connection,
    "exampleSharedState",
    {
      count: 0,
      message: "Initial Message",
    }
  );

  return (
    <Scene>
      <Box />
    </Scene>
  );
}
