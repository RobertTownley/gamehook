import { Scene, Shape, XYZ } from "gamehook";
import { useCallback, useMemo, useState } from "react";
import * as THREE from "three";

export function InteractionExample() {
  return (
    <Scene>
      <ClickToRotate position={[-2, 1, 0]} />
      <ClickToRotate position={[2, 1, 0]} />
      <HoverToChangeColor position={[0, -2, 0]} />
    </Scene>
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

export function HoverToChangeColor({ position }: CubeProps) {
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
      position={position}
      onHoverEnter={handleHoverEnter}
      onHoverExit={handleHoverExit}
      material={material}
    />
  );
}
