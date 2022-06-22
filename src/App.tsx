import { ReactNode } from "react";
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
  const component: ReactNode = (() => {
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
  })();
  return component;
}

export default App;
