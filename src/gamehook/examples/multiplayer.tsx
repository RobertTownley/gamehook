import { useMemo } from "react";

import { Box, Scene } from "../../gamehook";
import { XYZObject } from "../physics";
import { useConnection, useSharedState } from "./lib";

export function MultiplayerExample() {
  const { clientId, lobbyId } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("clientId") ?? "unknown";
    const lobbyId = params.get("lobbyId") ?? "unknown";
    return { clientId, lobbyId };
  }, []);

  const connection = useConnection({
    clientId,
    lobbyId,
  });

  const [exampleState, setExampleState] = useSharedState<XYZObject>(
    "example-state",
    connection,
    { x: 0, y: 0, z: 0 }
  );

  const handleClick = () => {
    setExampleState({ ...exampleState, x: exampleState.x + 1 });
  };

  return (
    <>
      <p>Click the button to move the box</p>
      <button onClick={handleClick}>Click Me</button>
      <Scene>
        <Box position={exampleState} />
      </Scene>
    </>
  );
}
