import { ObjectPosition, ObjectRotation } from "./types";

interface CubeProps {
  position?: ObjectPosition;
  rotation?: ObjectRotation;
}

export const Cube = ({ position, rotation }: CubeProps) => {
  const pos = position || [0, 0, 0];
  const rot = rotation || [0, 0, 0];

  return (
    <div>
      <div>
        <b>I will be a cube once Townley figures out the API</b>
      </div>
      <div>
        <i>Position: {pos.join(", ")}</i>
      </div>
      <div>
        <i>Rotation: {rot.join(", ")}</i>
      </div>
    </div>
  );
};
