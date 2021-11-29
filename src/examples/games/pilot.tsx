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
        <Camera
          active
          position={{ x: 0, y: 15, z: 5 }}
          orientation={{ x: -1, y: 0, z: 0 }}
        />
      </Scene>
    </Game>
  );
};
