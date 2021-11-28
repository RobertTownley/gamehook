import { Camera, Light, Game, Model, Scene } from "../../gamehook";

const Plane = () => {
  return <Model filepath="./assets/LowPolyPlane.glb" />;
};

export const Pilot = () => {
  return (
    <Game>
      <Scene title="PilotScene">
        <Light variant="ambient" />
        <Plane />
        <Camera active position={{ x: 0, y: 0, z: 5 }} />
      </Scene>
    </Game>
  );
};
