import {
  AudioExample,
  ButtonExample,
  ContainerExample,
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
import { InputsExample } from "./gamehook/examples/inputs";
import { WindowExample } from "./gamehook/examples/window";

type AvailableExamples =
  | "audio"
  | "button"
  | "container"
  | "events"
  | "fog"
  | "hover"
  | "inputs"
  | "lights"
  | "model"
  | "multiplayer"
  | "parents"
  | "pong"
  | "text"
  | "texture"
  | "window";

const exampleName: AvailableExamples = "inputs";

function App() {
  switch (exampleName) {
    case "audio":
      return <AudioExample />;
    case "button":
      return <ButtonExample />;
    case "container":
      return <ContainerExample />;
    case "events":
      return <EventsExample />;
    case "inputs":
      return <InputsExample />;
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
    case "window":
      return <WindowExample />;
  }
}

export default App;
