import { Mesh, ObjectPosition } from "../../../gamehook";

interface Props {
  position: ObjectPosition;
}

export const Pedistal = ({ position }: Props) => {
  return (
    <Mesh
      geometry={{ type: "cylinder", radiusBottom: 1.5 }}
      material={{ type: "normal" }}
      position={position}
      rotation={[Math.PI / 2, Math.PI / 4, 0]}
    />
  );
};
