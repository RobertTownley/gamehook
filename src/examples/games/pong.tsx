import { useState } from "react";

import {
  Camera,
  Collision,
  CollisionHandler,
  Game,
  Mesh,
  Position,
  PhysicsEngine,
  Scene,
} from "../../gamehook";

interface BallProps {
  onCollision: CollisionHandler;
}
const Ball = ({ onCollision }: BallProps) => {
  return (
    <Mesh
      acceleration={{ x: 0, y: 1, z: 0 }}
      geometry={{ type: "sphere", radius: 1 }}
      onCollision={onCollision}
      name="ball"
      position={{ x: 0, y: 1, z: 0 }}
      material={{ type: "basic", color: 0xff00ff }}
    />
  );
};

interface BrickProps {
  id: string;
  position: Position;
}
const Brick = ({ position }: BrickProps) => {
  return (
    <Mesh
      geometry={{ type: "box", height: 1, width: 3, depth: 1 }}
      material={{ type: "basic", color: 0x88ff00 }}
      name="brick"
      position={position}
    />
  );
};

const Paddle = () => {
  return (
    <Mesh
      material={{ type: "basic", color: 0x00aaff }}
      name="paddle"
      position={{ x: 0, y: 0, z: 0 }}
      geometry={{ type: "box", height: 1, width: 5, depth: 1 }}
    />
  );
};

export const Pong = () => {
  const [bricks, setBricks] = useState<BrickProps[]>([]);

  const handleCollision = (collision: Collision) => {
    const { target } = collision;
    if (target.name === "brick") {
      const newBricks = bricks.filter((b) => b.id !== target.id);
      setBricks(newBricks);
    } else if (target.name === "paddle") {
      console.log("Paddle");
    }
  };

  return (
    <Game>
      <Scene title="Game">
        <Camera type="perspective" />
        <PhysicsEngine />

        <Paddle />
        {bricks.map((brick, i) => (
          <Brick key={i} {...brick} />
        ))}
        <Ball onCollision={handleCollision} />
      </Scene>
    </Game>
  );
};
