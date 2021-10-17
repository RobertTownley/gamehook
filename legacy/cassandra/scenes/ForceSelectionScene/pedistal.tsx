import { Mesh, ObjectPosition } from "../../../gamehook";

interface Props {
  position: ObjectPosition;
}

export const Pedistal = ({ position }: Props) => {
  return (
    <Mesh
      geometry={{
        type: "cylinder",
        radiusTop: 0.75,
        radiusBottom: 1.25,
        radialSegments: 16,
      }}
      material={{ type: "normal" }}
      position={position}
      rotation={[Math.PI / 2, Math.PI / 4, 0]}
    />
  );
};

export const Pedistals = () => {
  return (
    <>
      <Pedistal position={[-9, 5, 0.5]} />
      <Pedistal position={[-6, 7, 0.5]} />
      <Pedistal position={[-3, 9, 0.5]} />
      <Pedistal position={[0, 11, 0.5]} />
      <Pedistal position={[3, 9, 0.5]} />
      <Pedistal position={[6, 7, 0.5]} />
      <Pedistal position={[9, 5, 0.5]} />
    </>
  );
};
