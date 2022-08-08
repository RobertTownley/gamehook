import { useEffect } from "react";
import { Box, Scene, XYZObject } from "../../gamehook";

import { useConnection, useSharedState } from "./lib";

export function MultiplayerExample() {
  const lobby = "04b3499c-5161-47be-a218-a748fe73d85f";
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";
  const username = params.get("username") ?? "";
  const connection = useConnection({
    lobby,
    token,
    username,
  });
  const otherPlayer =
    token === "566fa708-23c2-4eb3-9a81-84097a83a975"
      ? `${lobby}_player2`
      : `${lobby}_player1`;

  useEffect(() => {
    connection.connect(otherPlayer);
    return () => {
      connection.disconnect(otherPlayer);
    };
  }, [connection, otherPlayer, username]);

  const [exampleState, setExampleState] = useSharedState<XYZObject>(
    connection,
    "exampleSharedState",
    {
      x: 0,
      y: 0,
      z: 0,
    }
  );

  const handleClick = () => {
    const newX = Math.random() > 0.5 ? exampleState.x + 1 : exampleState.x - 1;
    setExampleState({
      x: newX,
      y: exampleState.y,
      z: exampleState.z,
    });
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
