import {
  AudioExample,
  EventsExample,
  FogExample,
  LightExample,
  ModelExample,
  MultiplayerExample,
  ParentsExample,
  Pong,
  TextExample,
  TextureExample,
} from "./gamehook/examples";

type AvailableExamples =
  | "audio"
  | "events"
  | "fog"
  | "lights"
  | "model"
  | "multiplayer"
  | "parents"
  | "pong"
  | "text"
  | "texture";

const exampleName: AvailableExamples = "fog";

function App() {
  switch (exampleName) {
    case "audio":
      return <AudioExample />;
    case "events":
      return <EventsExample />;
    case "fog":
      return <FogExample />;
    case "lights":
      return <LightExample />;
    case "model":
      return <ModelExample />;
    case "multiplayer":
      return <MultiplayerExample />;
    case "parents":
      return <ParentsExample />;
    case "pong":
      return <Pong />;
    case "text":
      return <TextExample />;
    case "texture":
      return <TextureExample />;
  }
}

export default App;
