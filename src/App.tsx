import {
  EventsExample,
  LightExample,
  ModelExample,
  ParentsExample,
  Pong,
  TextExample,
} from "./gamehook/examples";

type AvailableExamples =
  | "events"
  | "lights"
  | "model"
  | "parents"
  | "pong"
  | "text";

const exampleName: AvailableExamples = "model";

function App() {
  switch (exampleName) {
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
