import {
  AudioExample,
  EventsExample,
  FogExample,
  HoverExample,
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
  | "hover"
  | "lights"
  | "model"
  | "multiplayer"
  | "parents"
  | "pong"
  | "text"
  | "texture";

const exampleName: AvailableExamples = "hover";

function App() {
  switch (exampleName) {
    case "audio":
      return <AudioExample />;
    case "events":
      return <EventsExample />;
    case "fog":
      return <FogExample />;
    case "hover":
      return <HoverExample />;
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
