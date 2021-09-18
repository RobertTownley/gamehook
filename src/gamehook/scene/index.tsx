import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../store";

interface SceneProps {
  children: ReactNode;
  title: string;
}

export const Scene = ({ children, title }: SceneProps) => {
  const currentSceneTitle = useAppSelector((state) => state.scene.sceneTitle);
  const [isCurrent, setIsCurrent] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsCurrent(title === currentSceneTitle);
    }
    return () => {
      mounted = false;
    };
  }, [currentSceneTitle, title]);
  return isCurrent ? <>{children}</> : null;
};
