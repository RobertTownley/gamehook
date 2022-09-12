import { useMemo } from "react";

import {
  Box,
  Scene,
  XYZObject,
  useConnection,
  useSharedState,
} from "../../gamehook";

export function MultiplayerExample() {
  const { clientId, lobbyId } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("clientId");
    const lobbyId = params.get("lobbyId");
    return { clientId, lobbyId };
  }, []);
  if (!clientId || !lobbyId) {
    return <p>Please provide a URL that includes both clientId and lobbyId</p>;
  }
  return <Game clientId={clientId} lobbyId={lobbyId} />;
}

const INITIAL_VELOCITY = { x: 0, y: 0.1, z: 0 };

function Game({ clientId, lobbyId }: { clientId: string; lobbyId: string }) {
  const connection = useConnection({
    clientId,
    lobbyId,
  });

  const [velocity, setVelocity] = useSharedState<XYZObject>(
    "cube-velocity",
    connection,
    { x: 0, y: 0, z: 0 }
  );

  return (
    <>
      <p style={{ display: "fixed", top: 0 }}>
        Press a key to make the cube bounce
      </p>
      <Scene>
        <Box
          acceleration={{ x: 0, y: -0.002, z: 0 }}
          onKeypress={() => setVelocity(INITIAL_VELOCITY)}
          id="bouncing-box"
          syncProperties={{
            connection,
            properties: ["position"],
            id: "bouncing-box",
            frequency: 500,
          }}
          velocity={velocity}
        />
      </Scene>
    </>
  );
}
