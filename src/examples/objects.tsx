import { useState } from "react";

import { ObjectPosition } from "../gamehook/objects/types";
import { useAnimation } from "../gamehook/hooks";
import { Cube } from "../gamehook/objects";

const calculateNewPosition = (position: ObjectPosition): ObjectPosition => {
  const bound = 1;
  const negBound = 0 - bound;
  const step = 0.01;

  let [x, y, z] = position;
  if (y >= bound && x <= bound) {
    x += step;
  } else if (x >= bound && y >= negBound) {
    y -= step;
  } else if (x <= negBound) {
    y += step;
  } else if (y <= negBound) {
    x -= step;
  } else {
    y += step;
  }
  return [x, y, z];
};

export const MovingCube = () => {
  const [clicked, setClicked] = useState(false);
  const color = clicked ? 0xffffff : 0xaaff;
  const [position, setPosition] = useState<ObjectPosition>([0, 0, 0]);
  useAnimation(() => {
    setPosition((prev) => calculateNewPosition(prev));
  });
  return (
    <Cube
      interactions={{
        onClick: () => {
          setClicked((prev) => !prev);
        },
      }}
      position={position}
      color={color}
    />
  );
};
