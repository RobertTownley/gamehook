/* How this should work...
 *
 * - Developer needs a way of creating a connection between two or more clients
 *  - What's needed for that?
 *    - A signaling server to share connection details (SDP) with clients
 *    - Each client needs a connection to each other client in the lobby
 *    - The lobby needs to signal to each client when someone joins so that
 *      each client can establish a WebRTC connection
 *  - A TURN server is likely needed as well, since connections between
 *    clients may be unreliable if they're not on the same network
 *      - Don't fully get this, but it's listed in the WebRTC docs
 *

import { useEffect, useState } from "react";
import { Lobby } from "../../gamehook";
 */

// Connections
/*
const local = new RTCPeerConnection();
const remote = new RTCPeerConnection();
remote.ondatachannel = () => console.log("Receive channel callback");
local.onicecandidate = (e) =>
  !e.candidate || remote.addIceCandidate(e.candidate);
remote.onicecandidate = (e) =>
  !e.candidate || local.addIceCandidate(e.candidate);

// Channels
const exampleChannel = local.createDataChannel("exampleChannel");
exampleChannel.onopen = () => console.log("Status open");
exampleChannel.onclose = () => console.log("Status closed");

function WebRTCExample() {
  async function handleCreateConnection() {
    const offer = await local.createOffer();
    await local.setLocalDescription(offer);
    if (!local.localDescription) {
      throw new Error("Local connection doesn't have local description");
    }

    await remote.setRemoteDescription(local.localDescription);
    const answer = await remote.createAnswer();
    await remote.setLocalDescription(answer);
    if (!remote.localDescription) {
      throw new Error("Remote connection doesn't have local description");
    }
    local.setRemoteDescription(remote.localDescription);
  }

  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        boxSizing: "border-box",
        padding: 32,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ backgroundColor: "white", padding: 32 }}>
        <h1>WebRTC Example</h1>
        <button onClick={handleCreateConnection}>Create Connection</button>
      </div>
    </div>
  );
}

let started = false;
async function startExampleConnection() {
  // Just to avoid double printing
  if (started) return;
  started = true;
  console.clear();

  const localRTCConnection = new RTCPeerConnection(); // Local
  const remoteRTCConnection = new RTCPeerConnection();

  const localOffer = await localRTCConnection.createOffer();
  await localRTCConnection.setLocalDescription(localOffer);

  // Need a way of getting the local offer to remote connections
  await remoteRTCConnection.setRemoteDescription(localOffer);

  // On the remote computer an answer would be generated
  const answer = await remoteRTCConnection.createAnswer();
  await remoteRTCConnection.setLocalDescription(answer);

  // Signaling server needs to get that answer back to the local client
  localRTCConnection.setRemoteDescription(answer);
}

const baseUrl = "http://localhost:8000/api/v1";
interface JoinLobbyParams {
  token: string;
  lobbyId: string;
}
async function joinLobby(params: JoinLobbyParams) {
  await fetch(`${baseUrl}/lobbies/join/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(params),
  });

  return await fetchLobbyDetails(params.lobbyId, params.token);
}

async function fetchLobbyDetails(
  lobbyId: string,
  token: string
): Promise<Lobby> {
  const response = await fetch(`${baseUrl}/lobbies/details/${lobbyId}/`, {
    headers: {
      Allow: "GET",
      "Content-Type": "application/json",
      "X-GAMEHOOK-TOKEN": token,
    },
  });
  return await response.json();
}

export function MultiplayerExample() {
  const [remoteClients, setRemoteClients] = useState([]);
  const lobbyId = "04b3499c-5161-47be-a218-a748fe73d85f";
  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const [lobby, setLobby] = useState<Lobby>({
    status: "loading",
    public_id: lobbyId,
  });

  useEffect(() => {
    joinLobby({
      lobbyId,
      token,
    }).then(() => {
      fetchLobbyDetails(lobbyId, token).then((details) => {
        setLobby(details);
      });
    });
    startExampleConnection();
  }, [token]);
  if (lobby.status === "loading") return <></>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Testing</h1>
      <h2>{lobby.public_id}</h2>
      {lobby.memberships.map((membership) => {
        const { username } = membership.profile;
        const ownership = membership.owner ? " (owner)" : "";
        const label = `${username}${ownership}`;
        return <p key={membership.profile.username}>{label}</p>;
      })}
      <pre>{JSON.stringify(lobby, null, 2)}</pre>
    </div>
  );
}
*/
