import { ReactNode } from "react";
import {
  LightExample,
  ModelExample,
  ParentsExample,
  Pong,
  TextExample,
} from "./gamehook/examples";

type AvailableExamples = "lights" | "model" | "parents" | "pong" | "text";
const exampleName = "pong" as unknown as AvailableExamples;

function App() {
  const component: ReactNode = (() => {
    switch (exampleName) {
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
