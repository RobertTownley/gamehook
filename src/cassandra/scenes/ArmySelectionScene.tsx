import { CameraControl, MaterialOptions, Mesh } from "../../gamehook";
import { AmbientLight, Scene } from "../../gamehook";

const BoundingBox = () => {
  const material: MaterialOptions = { type: "normal" };
  return (
    <>
      <Mesh
        material={material}
        geometry={{ type: "box", width: 10, height: 10, depth: 0.1 }}
      />
      <Mesh
        material={material}
        geometry={{ type: "box", width: 0.1, height: 10, depth: 10 }}
        position={[5, 0, 5]}
      />
      <Mesh
        material={material}
        geometry={{ type: "box", width: 0.1, height: 10, depth: 10 }}
        position={[-5, 0, 5]}
      />
      <Mesh
        material={material}
        geometry={{ type: "box", width: 10, height: 0.1, depth: 10 }}
        position={[0, 5, 5]}
      />
    </>
  );
};
export const ArmySelectionScene = () => {
  console.log("Scene");
  return (
    <Scene>
      <CameraControl
        initialPosition={[0, -3, 5]}
        initialRotation={[1.0, 0, 0]}
      />
      <AmbientLight />
      <BoundingBox />
    </Scene>
  );
};
