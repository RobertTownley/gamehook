import _ from "lodash";
import { Camera, Light, Game, Model, Scene, Sphere } from "../../gamehook";

const Plane = () => {
  return (
    <Model
      filepath="./assets/LowPolyPlane.glb"
      velocity={{ x: 0, y: 0, z: -0.01 }}
    />
  );
};

function StarField() {
  const STAR_COUNT = 1000;
  const randomPosition = () => {
    return {
      x: _.random(-10, 10, true),
      y: _.random(-10, 0, true),
      z: _.random(-40, 0, true),
    };
  };
  return (
    <>
      {_.range(0, STAR_COUNT).map((_i) => {
        return <Sphere position={randomPosition()} radius={0.01} />;
      })}
    </>
  );
}

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
          velocity={{ x: 0, y: 0, z: -0.01 }}
        />
        <StarField />
      </Scene>
    </Game>
  );
};
