import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from "react";
import * as THREE from "three";

import { Game, Scene } from "../../gamehook";
import { Mesh } from "../../gamehook/objects/mesh";
import { Sphere } from "../../gamehook/objects/sphere";
import { useAnimation } from "../../gamehook/hooks";
import { GameObject, ObjectPosition } from "../../gamehook/objects/types";

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
      onClick={() => {
        console.log("BRICK CLICK");
      }}
    />
  );
};

interface BallProps {
  onCollision: (brick: GameObject) => void;
  setBallGone: Dispatch<SetStateAction<boolean>>;
  vector: ObjectPosition;
}
const Ball: FC<BallProps> = ({ onCollision, setBallGone, vector }) => {
  const [position, setPosition] = useState<ObjectPosition>([0, 1, 0]);

  useAnimation(() => {
    // Determine if it's gone too far off the screen
    const isGone = Math.abs(position[1]) > BOUNDARY;
    setBallGone(isGone);

    // Move the ball
    setPosition([
      position[0] + vector[0],
      position[1] + vector[1],
      position[2] + vector[2],
    ]);
  });

  return (
    <Sphere
      color={0xffff00}
      position={position}
      radius={0.125}
      onCollision={onCollision}
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
  const initialBrickPositions = (() => {
    const brickPositions: ObjectPosition[] = [];
    for (let i = -3; i <= 3; i += 1) {
      brickPositions.push([i, 2, 0]);
      brickPositions.push([i + 0.5, 2.5, 0]);
      brickPositions.push([i, 3, 0]);
    }
    return brickPositions;
  })();

  const [ballGone, setBallGone] = useState(false);
  const [brickPositions, setBrickPositions] = useState(initialBrickPositions);
  const [ballVector, setBallVector] = useState<ObjectPosition>([0.01, 0.01, 0]);

  const handleCollision = (brick: GameObject) => {
    // Change ball's path
    const newVector: ObjectPosition = [
      ballVector[0],
      0 - Math.abs(ballVector[0]),
      ballVector[2],
    ];
    setBallVector(newVector);

    // Remove the brick
    const newBrickPositions = brickPositions.filter(
      (position) => position !== brick.position
    );
    setBrickPositions(newBrickPositions);
    console.log({ brick });
  };
  return (
    <>
      {ballGone && <h1>Game Over!</h1>}
      <Game>
        <Scene title="Intro">
          {brickPositions.map((position, i) => (
            <Brick position={position} key={i} />
          ))}
          <Paddle />
          <Ball
            onCollision={handleCollision}
            setBallGone={setBallGone}
            vector={ballVector}
          />
        </Scene>
      </Game>
    </>
  );
};
