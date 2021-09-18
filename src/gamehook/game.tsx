import { ReactNode, useState } from "react";

interface GameProps {
  children: Array<ReactNode>;
  initialSceneTitle: string;
}

export const Game = ({ children, initialSceneTitle }: GameProps) => {
  const [sceneTitle, setSceneTitle] = useState(initialSceneTitle);
  // TODO: Find and save to state active scene based on scene title
  const scene = children[0];

  return <div>{scene}</div>;
};
