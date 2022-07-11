import { Dispatch, SetStateAction } from "react";

import { ConnectionStatus } from "../types";

interface Props {
  setStatus: Dispatch<SetStateAction<ConnectionStatus>>;
}
export function ConnectionReadyUI({ setStatus }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <CommsButton
        onClick={() => setStatus("creatingLobby")}
        value="Create Game"
      />
      <CommsButton
        onClick={() => setStatus("creatingLobbyInviteRequest")}
        value="Join Existing Game"
      />
    </div>
  );
}

function CommsButton({
  onClick,
  value,
}: {
  onClick: () => void;
  value: string;
}) {
  return (
    <div
      style={{
        width: "50%",
        border: "1px black solid",
        padding: 8,
        textAlign: "center",
        margin: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <h2>{value}</h2>
    </div>
  );
}
