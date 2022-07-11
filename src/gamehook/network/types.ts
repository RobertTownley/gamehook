export type ConnectionStatus =
  | "ready"
  | "connected"
  | "disconnected"
  | "creatingLobby"
  | "creatingLobbyInviteRequest";

export interface GameConnection {
  lobby: Lobby;
  localPeerConnection: RTCPeerConnection;
  status: ConnectionStatus;
  token: string;
  username: string;
}

// Lobby for multiplayer
interface LoadedLobby {
  created_at: string;
  memberships: LobbyMembership[];
  public_id: string;
  status: "loaded";
}

interface LoadingLobby {
  public_id: string;
  status: "loading";
}

export type Lobby = LoadingLobby | LoadedLobby;

interface LobbyMembership {
  created_at: string;
  owner: boolean;
  profile: Profile;
}

interface Profile {
  public_id: string;
  username: string;
}
