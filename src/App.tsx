import {
  AudioExample,
  EventsExample,
  LightExample,
  ModelExample,
  ParentsExample,
  Pong,
  TextExample,
} from "./gamehook/examples";

type AvailableExamples =
  | "audio"
  | "events"
  | "lights"
  | "model"
  | "parents"
  | "pong"
  | "text";

const exampleName: AvailableExamples = "audio";

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
    case "parents":
      return <ParentsExample />;
    case "pong":
      return <Pong />;
    case "text":
      return <TextExample />;
  }
}

export default App;
