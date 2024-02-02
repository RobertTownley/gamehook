import { deg, Animation, Camera, Light, Model, Scene } from "gamehook";

export function ModelExample() {
  return (
    <Scene>
      <Camera position={[0, 1, 15]} />
      <Light variant="ambient" intensity={1} />
      <Light variant="point" intensity={50} />

      <Model scale={[0.005, 0.005, 0.005]} position={[-4, 0, 0]}>
        <Animation name="Take 001" />
      </Model>

      <Model
        scale={[0.005, 0.005, 0.005]}
        rotation={[0, deg(1), 0]}
        position={[4, 0, 0]}
      />
    </Scene>
  );
}
