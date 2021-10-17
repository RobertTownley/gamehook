import { useState } from "react";

import {
  AmbientLight,
  Camera,
  Collision,
  CollisionHandler,
  Game,
  Mesh,
  Orientation,
  Position,
  PhysicsEngine,
  Scene,
} from "../../gamehook";

interface BallProps {
  orientation: Orientation;
  onCollision: CollisionHandler;
}
const Ball = ({ orientation, onCollision }: BallProps) => {
  return (
    <Mesh
      acceleration={{ x: 0, y: 1, z: 0 }}
      orientation={orientation}
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
  const [ballOrientation, setBallOrientation] = useState<Orientation>({
    x: 0,
    y: 0,
    z: 0,
    w: 0,
  });
  const [bricks, setBricks] = useState<BrickProps[]>([]);

  const handleCollision = (collision: Collision) => {
    const { target } = collision;
    if (target.name === "brick") {
      const newBricks = bricks.filter((b) => b.id !== target.id);
      setBricks(newBricks);

      const newBallOrientation = determineBallOrientation(collision);
      setBallOrientation(newBallOrientation);
    } else if (target.name === "paddle") {
      console.log("Paddle");
    }
  };

  return (
    <Game>
      <Scene title="Game">
        <AmbientLight />
        <Camera type="perspective" />
        <PhysicsEngine />

        <Paddle />
        {bricks.map((brick, i) => (
          <Brick key={i} {...brick} />
        ))}
        <Ball orientation={ballOrientation} onCollision={handleCollision} />
      </Scene>
    </Game>
  );
};

const determineBallOrientation = (collision: Collision): Orientation => {
  // TODO
  return {
    x: 0,
    y: 0,
    z: 0,
    w: 0,
  };
};
