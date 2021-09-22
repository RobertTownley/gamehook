import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import * as THREE from "three";

import { Game, Scene } from "../../gamehook";
import { Mesh } from "../../gamehook/objects/mesh";
import { Sphere } from "../../gamehook/objects/sphere";
import { useAnimation } from "../../gamehook/hooks";
import { ObjectPosition } from "../../gamehook/objects/types";

const BOUNDARY = 4; // How far the ball travels before the game ends
const BrickGeometry = new THREE.BoxGeometry(0.5, 0.125, 0.01);
const BrickMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const PaddleGeometry = new THREE.BoxGeometry(2, 0.125, 0.01);
const PaddleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const Brick: FC<{ position: ObjectPosition }> = ({ position }) => {
  return (
    <Mesh
      geometry={BrickGeometry}
      material={BrickMaterial}
      position={position}
      triggersCollisions
    />
  );
};

interface BallProps {
  setBallGone: Dispatch<SetStateAction<boolean>>;
}
const Ball: FC<BallProps> = ({ setBallGone }) => {
  const [vector, setVector] = useState([0.01, 0.01, 0]);
  const [position, setPosition] = useState<ObjectPosition>([0, 1, 0]);

  useAnimation(() => {
    // Determine if it's gone too far off the screen
    //
    // Move the ball
    // TODO: Determine why the position state hook is only accurate
    // inside the callback of the setter. As in, why this won't work here:
    const isGone = Math.abs(position[1]) > BOUNDARY;
    setBallGone(isGone);
    setPosition((prev) => {
      return [prev[0] + vector[0], prev[1] + vector[1], prev[2] + vector[2]];
    });
  });

  const handleCollision = (other: unknown) => {
    console.log("I collided!");
    console.log({ other });
  };

  return (
    <Sphere
      color={0xffff00}
      position={position}
      radius={0.125}
      onCollision={handleCollision}
    />
  );
};

const Paddle = () => {
  const position: ObjectPosition = [0, -2, 0];
  return (
    <Mesh
      geometry={PaddleGeometry}
      material={PaddleMaterial}
      position={position}
    />
  );
};

export const Pong = () => {
  const brickPositions: ObjectPosition[] = [];
  const [ballGone, setBallGone] = useState(false);

  for (let i = -3; i <= 3; i += 1) {
    brickPositions.push([i, 2, 0]);
    brickPositions.push([i + 0.5, 2.5, 0]);
    brickPositions.push([i, 3, 0]);
  }
  useLayoutEffect(() => {
    console.log({ ballGone });
  }, [ballGone]);
  return (
    <>
      {ballGone && <h1>Game Over!</h1>}
      <Game>
        <Scene title="Intro">
          {brickPositions.map((position, i) => (
            <Brick position={position} key={i} />
          ))}
          <Paddle />
          <Ball setBallGone={setBallGone} />
        </Scene>
      </Game>
    </>
  );
};
