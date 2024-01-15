import { useRef } from "react";

import { useSceneId, useSceneReady } from "./hooks";
import { InnerSceneProps, SceneProps } from "./types";

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useSceneId(props);
  const ready = useSceneReady();

  return (
    <>
      <canvas ref={canvasRef} id={id} />
      {ready && canvasRef.current && (
        <GamehookScene {...props} id={id} canvas={canvasRef.current} />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { children } = props;
  return <>{children}</>;
}
