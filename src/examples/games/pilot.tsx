import { Light, Game, Model, Scene } from "../../gamehook";

const Plane = () => {
  return <Model filepath="./assets/LowPolyPlane.glb" />;
};

export const Pilot = () => {
  return (
    <Game>
      <Scene title="PilotScene">
        <Light variant="ambient" />
        <Plane />
      </Scene>
    </Game>
  );
};
