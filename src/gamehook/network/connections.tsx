import { useEffect, useState } from "react";
import { ConnectionStatus, GameConnection } from "./types";

interface UseConnection {
  lobby: string;
  token: string;
  username: string;
}

type ConnectionPairing = [RTCPeerConnection, RTCPeerConnection];
export function useConnection({
  lobby,
  token,
  username,
}: UseConnection): GameConnection {
  const [RTCList, setRTCList] = useState<ConnectionPairing[]>([]);

  const [status, setStatus] = useState<ConnectionStatus>("ready");
  const [localRTCConnection, setLocalRTCConnection] =
    useState<RTCPeerConnection>(new RTCPeerConnection());
  const [remoteRTCConnections, setRemoteRTCConnections] = useState<
    RTCPeerConnection[]
  >([]);

  // On load, create a local connection and set the local offer
  useEffect(() => {
    localRTCConnection.createOffer().then((offer) => {
      localRTCConnection.setLocalDescription(offer);
    });
  }, [localRTCConnection]);

  // Whenever there's a new remote connection, set the local description
  const localRTCConnectionDescription = localRTCConnection.localDescription;
  useEffect(() => {
    if (!localRTCConnectionDescription) return;
    remoteRTCConnections.forEach((remote) => {
      remote.setRemoteDescription(localRTCConnectionDescription);
    });
  }, [localRTCConnectionDescription, remoteRTCConnections]);

  return {
    lobby: {
      public_id: lobby,
      status: "loading",
    },
    localPeerConnection: new RTCPeerConnection(),
    status,
    token,
    username,
  };
}
