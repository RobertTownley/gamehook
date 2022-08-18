import {
  AudioExample,
  EventsExample,
  LightExample,
  ModelExample,
  MultiplayerExample,
  ParentsExample,
  Pong,
  TextExample,
} from "./gamehook/examples";

type AvailableExamples =
  | "audio"
  | "events"
  | "lights"
  | "model"
  | "multiplayer"
  | "parents"
  | "pong"
  | "text";

const exampleName: AvailableExamples = "multiplayer";

function App() {
  switch (exampleName) {
    case "audio":
      return <AudioExample />;
    case "events":
      return <EventsExample />;
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
  }
}

export default App;
