import _ from "lodash";
import { Mesh } from "../../../gamehook/objects/mesh";
import { ObjectPosition } from "../../../gamehook/objects/types";

interface Props {
  variant: "store" | "riverfront";
}
export const Background = ({ variant }: Props) => {
  if (variant !== "store") {
    throw new Error("TODO: Build other variants");
  }
  return <StoreBackground />;
};

const Tile = ({ position }: { position: ObjectPosition }) => {
  return (
    <Mesh
      geometry={{ type: "plane", width: 0.95, height: 0.95 }}
      material={{ type: "basic", color: 0xbbbbbb }}
      position={position}
    />
  );
};

const Floor = () => {
  const COLS = 50;
  const ROWS = 50;

  return (
    <>
      {_.range(0, ROWS * COLS).map((i) => (
        <Tile
          key={i}
          position={[(i % ROWS) - ROWS / 2, Math.floor(i / COLS) - COLS / 2, 0]}
        />
      ))}
    </>
  );
};

const StoreBackground = () => {
  return (
    <>
      <Floor />
    </>
  );
};
