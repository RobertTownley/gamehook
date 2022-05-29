import { useState } from "react";
import _ from "lodash";

import { generateUUID } from "../../gamehook";
import { Box, Sphere } from "../mesh";
import { Collision, XYZ } from "../physics";
import { Camera } from "../camera";
import { XYZObject } from "../physics/types";

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
      name="paddle"
      onKeypress={movePaddle}
      position={{ x, y: -8, z: 0 }}
      width={5}
      depth={0.5}
      collides
    />
  );
}

export function Pong() {
  const rateOfMovement = 0.02;
  const [ballVelocity, setBallVelocity] = useState<XYZObject>({
    x: 0,
    y: rateOfMovement,
    z: 0,
  });
  const [bricks, setBricks] = useState<{ position: XYZ; id: string }[]>(
    _.range(0, 50).map((_i) => ({
      position: [_.random(-15, 15), _.random(2, 9), 0],
      id: generateUUID(),
    }))
  );
  const onBallCollision = ({
    collidedWith,
    colliderLocation,
    collidedWithLocation,
  }: Collision) => {
    // Remove collided bricks
    const newBricks = bricks.filter((p) => collidedWith.id !== p.id);
    setBricks(newBricks);

    // Change ball direction
    const newVelocity = (() => {
      if (collidedWith.name === "paddle") {
        const newX = (colliderLocation.x - collidedWithLocation.x) / 100;
        console.log(newX);
        return { x: newX, y: rateOfMovement, z: 0 };
      } else if (collidedWith.name === "brick") {
        return { x: ballVelocity.x, y: 0 - rateOfMovement, z: 0 };
      } else {
        throw new Error(`Unknown collision name: ${collidedWith.name}`);
      }
    })();
    setBallVelocity(newVelocity);
  };

  return (
    <>
      {bricks.map(({ position, id }) => (
        <Box
          key={id}
          name="brick"
          position={position}
          width={1.5}
          height={0.5}
          depth={1}
          collides
          id={id}
        />
      ))}
      <Sphere
        position={{ x: 0, y: -5, z: 0 }}
        velocity={ballVelocity}
        onCollision={onBallCollision}
        id="ball"
      />
      <Paddle />
      <Camera position={{ x: 0, y: 0, z: 10 }} trackTo="ball" />
    </>
  );
}
