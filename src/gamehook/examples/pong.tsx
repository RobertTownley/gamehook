import { useState } from "react";
import _ from "lodash";

import { Box, Sphere } from "../mesh";
import { CollisionHandler, Collision, XYZ } from "../physics";
import { Camera } from "../camera";

function Bricks() {
  const positions: XYZ[] = [];
  for (const x of _.range(-10, 10)) {
    for (const y of _.range(0, 3)) {
      positions.push([x * 2.1 + (y % 2 === 1 ? 0.5 : 0), 2 * y, 0]);
    }
  }
  return (
    <>
      {positions.map((position) => {
        return (
          <Box
            key={position.toString()}
            position={position}
            width={1}
            height={0.5}
            depth={0.1}
            collides
          />
        );
      })}
    </>
  );
}

function Ball({ onCollision }: { onCollision: CollisionHandler }) {
  return (
    <Sphere
      position={{ x: 0, y: -5, z: 0 }}
      velocity={{ x: 0, y: 0.01, z: 0 }}
      onCollision={onCollision}
    />
  );
}

function Paddle() {
  const [x, setX] = useState(0);
  function movePaddle(event: KeyboardEvent) {
    if (event.key === "a") {
      setX(x - 0.2);
    } else if (event.key === "d") {
      setX(x + 0.2);
    }
  }

  return (
    <Box
      onKeypress={movePaddle}
      position={{ x, y: -8, z: 0 }}
      width={5}
      depth={0.5}
      collides
    />
  );
}

export function Pong() {
  function onBallCollision(collision: Collision) {
    console.log("Ball hit something");
  }
  return (
    <>
      <Bricks />
      <Ball onCollision={onBallCollision} />
      <Paddle />
      <Camera position={{ x: -5, y: 0, z: 15 }} />
    </>
  );
}
