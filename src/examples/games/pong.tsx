import _ from "lodash";
import { useEffect, useState } from "react";
import {
  Box,
  Collision,
  CollisionHandler,
  generateUUID,
  Game,
  Position,
  Scene,
  Sphere,
  Velocity,
} from "../../gamehook";

const STEP = 0.2;
const BALL_RESPONSIVENESS = 0.01;
const BALL_SPEED = 0.0125;
const Paddle = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: -2, z: 0 });
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setPosition((pos) => ({ ...pos, x: pos.x + STEP }));
    } else if (event.key === "ArrowLeft") {
      setPosition((pos) => ({ ...pos, x: pos.x - STEP }));
    }
  };
  return (
    <Box
      name="Paddle"
      position={position}
      width={2}
      height={0.1}
      depth={0.5}
      onKeyDown={handleKeyPress}
      collides
    />
  );
};

interface BallProps {
  onCollision: CollisionHandler;
  velocity: Velocity;
}
const Ball = ({ onCollision, velocity }: BallProps) => {
  return (
    <Sphere
      name="Ball"
      radius={0.2}
      velocity={velocity}
      onCollision={onCollision}
    />
  );
};
interface BrickProps {
  id: string;
  position: Position;
}

const Brick = ({ id, position }: BrickProps) => {
  return (
    <Box
      name="Brick"
      position={position}
      width={0.3}
      height={0.1}
      depth={0.1}
      id={id}
      collides
    />
  );
};

const Edges = () => {
  return (
    <>
      <Box
        position={{ x: -6, y: 0, z: -3 }}
        name="Edge"
        labels={["left"]}
        width={0.1}
        depth={10}
        height={7}
        collides
      />
      <Box
        name="Edge"
        position={{ x: 6, y: 0, z: -3 }}
        labels={["right"]}
        width={0.1}
        depth={10}
        height={7}
        collides
      />
      <Box
        name="Edge"
        labels={["top"]}
        position={{ x: 0, y: 5, z: -3 }}
        width={12}
        depth={12}
        height={3}
        collides
      />
    </>
  );
};

export const Pong = () => {
  // Bricks
  const BrickCount = 50;
  const [bricks, setBricks] = useState<BrickProps[]>([]);
  useEffect(() => {
    setBricks(
      _.range(0, BrickCount).map((_x) => ({
        id: generateUUID(),
        position: { x: _.random(-5, 5, true), y: _.random(1, 3, true), z: 0 },
      }))
    );
  }, []);

  // Ball
  const [ballVelocity, setBallVelocity] = useState({
    x: BALL_SPEED,
    y: BALL_SPEED,
    z: 0,
  });

  const handleCollision = (collision: Collision) => {
    if (collision.target.name === "Brick") {
      setBricks((bricks) => bricks.filter((b) => b.id !== collision.target.id));
      setBallVelocity({ ...ballVelocity, y: 0 - ballVelocity.y });
    } else if (collision.target.name === "Paddle") {
      // Compute new ball trajectory depending on where it hit the paddle
      const intersectionX = collision.intersections[0].point.x;
      const paddleX = collision.target.three.position.x;
      const ratio = (intersectionX - paddleX) * BALL_RESPONSIVENESS;
      setBallVelocity({ x: ratio, y: 0.01, z: 0 });
    } else if (collision.target.name === "Edge") {
      if (!collision.target.labels) return;
      const label = collision.target.labels[0];
      if (label === "left") {
        setBallVelocity({ ...ballVelocity, x: BALL_SPEED });
      } else if (label === "right") {
        setBallVelocity({ ...ballVelocity, x: 0 - BALL_SPEED });
      } else if (label === "top") {
        setBallVelocity({ ...ballVelocity, y: 0 - BALL_SPEED });
      }
    }
  };

  return (
    <Game>
      <Scene title="Initial">
        <Paddle />
        <Ball onCollision={handleCollision} velocity={ballVelocity} />
        {bricks.map((brick) => (
          <Brick key={brick.id} {...brick} />
        ))}
        <Edges />
      </Scene>
    </Game>
  );
};
