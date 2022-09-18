import { useCallback, useState } from "react";
import {
  Box,
  Scene,
  XYZObject,
  useConnection,
  useSharedEvent,
} from "../../gamehook";

function Game({ clientId, lobbyId }: { clientId: string; lobbyId: string }) {
  const connection = useConnection({
    clientId,
    lobbyId,
  });
  const [velocity, setVelocity] = useState<XYZObject>({ x: 0, y: 0, z: 0 });
  const interactionEvent = useSharedEvent<number>("player-input", connection);

  const handleKeypress = useCallback(
    (sendTime: number, remote: boolean) => {
      const newX = velocity.x > 0 ? -0.05 : 0.05;
      const now = Date.now();
      setVelocity({ x: newX, y: 0, z: 0 });
      if (!remote) {
        interactionEvent.emit(now);
      } else {
        const duration = now - sendTime;
        console.log(`Message took ${duration}ms to arrive`);
      }
    },
    [interactionEvent, velocity.x]
  );

  interactionEvent.listen((message) => handleKeypress(message.payload, true));

  return (
    <>
      <Box
        id="mycube"
        velocity={velocity}
        onKeypress={() => {
          const now = Date.now();
          handleKeypress(now, false);
        }}
      />
    </>
  );
}

export function MultiplayerExample() {
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get("user");
  const lobbyId = params.get("lobby");
  if (!clientId || !lobbyId) {
    return (
      <p>
        Please add your user and lobby to the URL search bar. Eg
        mysite.com?user=myname&lobby=mylobby
      </p>
    );
  }
  return (
    <Scene>
      <Game clientId={clientId} lobbyId={lobbyId} />
    </Scene>
  );
}
