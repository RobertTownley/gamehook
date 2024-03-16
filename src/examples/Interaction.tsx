import { Scene, Shape, XYZ } from "gamehook";
import { useCallback, useMemo, useState } from "react";
import * as THREE from "three";

export function InteractionExample() {
  return (
    <>
      <Scene alpha={true} clearColor={0x000000} clearOpacity={0}>
        <ClickToRotate position={[-2, 2, 0]} />
        <ClickToRotate position={[2, 2, 0]} />
        <HoverToChangeColor />
        <PressSpaceToGrow />
      </Scene>
      <div
        style={{
          backgroundColor: "blue",
          width: "100vw",
          top: 0,
          left: 0,
          height: "100vh",
          boxSizing: "border-box",
          position: "fixed",
          zIndex: -1,
          padding: 32,
        }}
      >
        <p style={{ fontSize: 49, color: "orange" }}>
          The canvas can be transparent, btw
        </p>
      </div>
    </>
  );
}

interface CubeProps {
  position: XYZ;
}
export function ClickToRotate({ position }: CubeProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = useCallback(() => {
    setIsRotating(!isRotating);
  }, [isRotating]);

  return (
    <Shape
      onClick={handleClick}
      rotation={isRotating ? [0, 0, 0.01] : [0, 0, 0]}
      position={position}
    />
  );
}

export function HoverToChangeColor() {
  const [isRed, setIsRed] = useState(false);
  const material = useMemo(() => {
    return isRed
      ? new THREE.MeshBasicMaterial({ color: 0xff0000 })
      : new THREE.MeshNormalMaterial();
  }, [isRed]);

  const handleHoverEnter = useCallback(() => {
    setIsRed(true);
  }, []);

  const handleHoverExit = useCallback(() => {
    setIsRed(false);
  }, []);

  return (
    <Shape
      onHoverEnter={handleHoverEnter}
      onHoverExit={handleHoverExit}
      material={material}
      position={[0, 0, 0]}
    />
  );
}

function PressSpaceToGrow() {
  const [isBig, setIsBig] = useState(false);
  const scale: XYZ = useMemo(() => {
    return isBig ? [8, 1, 1] : [1, 1, 1];
  }, [isBig]);

  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        setIsBig(!isBig);
      }
    },
    [isBig]
  );

  return (
    <Shape position={[0, -2, 0]} scale={scale} onKeyDown={handleKeypress} />
  );
}
