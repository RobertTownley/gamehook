import { ReactNode } from "react";
import { useAppSelector } from "../store";

interface SceneProps {
  children: ReactNode;
  title: string;
}

export const Scene = ({ children, title }: SceneProps) => {
  const currentSceneTitle = useAppSelector((state) => state.scene.sceneTitle);
  console.log({ currentSceneTitle, title });
  if (currentSceneTitle !== title) return null;

  return <div>{children}</div>;
};
