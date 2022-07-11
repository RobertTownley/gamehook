import { ReactNode, useMemo, useState } from "react";

import { CreateGameLobbyUI } from "./CreateGameLobbyUI";
import { ConnectionReadyUI } from "./ConnectionReadyUI";

import { ConnectionStatus } from "../types";
import { ConnectionUIProps } from "./types";

type CommunicationMediumName = "audio" | "text" | "video";
interface CommunicationsProps {
  mediums: CommunicationMediumName[];
  variant: "bottom-overlay" | "column";
  username?: string | null;
}
interface ContainerProps {
  children: ReactNode;
  height?: string;
  width?: string;
}

function BottomOverlay({
  children,
  width = "480px",
  height = "320px",
}: ContainerProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 100,
        width,
        height,
        bottom: 0,
        right: 0,
        backgroundColor: "#888888",
        margin: 16,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}

export function Communications(props: CommunicationsProps) {
  const [status, setStatus] = useState<ConnectionStatus>("ready");
  const Container = useMemo(() => {
    switch (props.variant) {
      case "bottom-overlay":
        return BottomOverlay;
      case "column":
        // TODO
        return BottomOverlay;
    }
  }, [props.variant]);

  const uiProps: ConnectionUIProps = {
    setStatus,
  };
  return (
    <Container>
      {status === "ready" && <ConnectionReadyUI {...uiProps} />}
      {status === "creatingLobby" && <CreateGameLobbyUI {...uiProps} />}
    </Container>
  );
}
