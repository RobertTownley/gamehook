import { Dispatch, FC, SetStateAction, useState } from "react";

import { Game, Scene } from "../../gamehook";
import { Mesh } from "../../gamehook/objects/mesh";
import { Sphere } from "../../gamehook/objects/sphere";
import { useAnimation } from "../../gamehook/hooks";
import { ObjectPosition } from "../../gamehook/objects/types";
import { CollisionResolver } from "../../gamehook/interactions/collisions";

const BOUNDARY = 4; // How far the ball travels before the game ends

const Brick: FC<{ position: ObjectPosition }> = ({ position }) => {
  return (
    <Mesh
      geometry={{ type: "box", width: 0.5, height: 0.125, depth: 0.01 }}
      material={{ color: 0x00ff00, type: "basic" }}
      position={position}
      name="brick"
      triggersCollisions
    />
  );
};

interface BallProps {
  onCollision: CollisionResolver;
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
      material={{ color: 0xffff00, type: "basic" }}
      position={position}
      radius={0.125}
      onCollision={onCollision}
      triggersCollisions
      name="ball"
    />
  );
};

interface PaddleProps {
  position: ObjectPosition;
  setPaddlePosition: Dispatch<SetStateAction<ObjectPosition>>;
  onCollision: CollisionResolver;
}

// Game speed constants
const STEP = 0.5;
const BALL_SPEED = 0.025;

const Paddle = ({ position, onCollision, setPaddlePosition }: PaddleProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setPaddlePosition([position[0] - STEP, position[1], position[2]]);
    } else if (event.key === "ArrowRight") {
      setPaddlePosition([position[0] + STEP, position[1], position[2]]);
    }
  };

  return (
    <Mesh
      geometry={{ type: "box", width: 2, height: 0.125, depth: 0.01 }}
      material={{ color: 0x00ffff, type: "basic" }}
      position={position}
      onKeyDown={handleKeyPress}
      onCollision={onCollision}
      triggersCollisions
      name="paddle"
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
  const [ballVector, setBallVector] = useState<ObjectPosition>([
    BALL_SPEED,
    BALL_SPEED,
    0,
  ]);
  const [paddlePosition, setPaddlePosition] = useState<ObjectPosition>([
    0, -2, 0,
  ]);

  const handleBrickCollision: CollisionResolver = ({ collided }) => {
    if (collided.name !== "brick") return;

    // Change ball's path
    const newVector: ObjectPosition = [
      ballVector[0],
      0 - Math.abs(ballVector[0]),
      ballVector[2],
    ];
    setBallVector(newVector);

    // Remove the brick
    const newBrickPositions = brickPositions.filter(
      (position) => position !== collided.position
    );
    setBrickPositions(newBrickPositions);
  };

  const handlePaddleCollision: CollisionResolver = ({ collided }) => {
    if (collided.name !== "ball") return;

    // Determine new X vector for the ball based on paddle position
    setBallVector((prev) => [-0.01, Math.abs(prev[1]), prev[2]]);
  };

  return (
    <>
      {ballGone && <h1>Game Over!</h1>}
      <Game>
        <Scene>
          {brickPositions.map((position, i) => (
            <Brick position={position} key={i} />
          ))}
          <Paddle
            position={paddlePosition}
            setPaddlePosition={setPaddlePosition}
            onCollision={handlePaddleCollision}
          />
          <Ball
            onCollision={handleBrickCollision}
            setBallGone={setBallGone}
            vector={ballVector}
          />
        </Scene>
      </Game>
    </>
  );
};
