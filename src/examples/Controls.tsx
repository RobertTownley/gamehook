import _ from "lodash";
import * as THREE from "three";
import { Camera, Fog, Shape, Scene, XYZ, Light, MapControls } from "gamehook";

const Geometry = new THREE.BoxGeometry();
const Material = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  flatShading: true,
});
const range = _.range(0, 500);
Geometry.translate(0, 0.5, 0);

const CameraPosition: XYZ = [300, 1000, 0];
export function ControlsExample() {
  return (
    <Scene backgroundColor={new THREE.Color(0xcccccc)}>
      <Camera position={CameraPosition} fov={60} near={1} far={1000} />
      <Inner />
      <MapControls
        variant="map"
        maxTargetRadius={500}
        zoomToCursor
        maxDistance={500}
        minDistance={20}
      />
      <Fog variant="exponential" color={0xcccccc} density={0.002} />
    </Scene>
  );
}
function Inner() {
  return (
    <>
      {range.map((i: number) => {
        const position: XYZ = [
          Math.random() * 1600 - 800,
          0,
          Math.random() * 1600 - 800,
        ];
        const scale: XYZ = [20, Math.random() * 80 + 10, 20];

        return (
          <Shape
            scale={scale}
            position={position}
            key={i}
            geometry={Geometry}
            material={Material}
          />
        );
      })}
      <Light
        variant="directional"
        color={0xffffff}
        intensity={3}
        position={[1, 1, 1]}
      />
      <Light
        variant="directional"
        color={0x002288}
        intensity={3}
        position={[-1, -1, -1]}
      />
      <Shape scale={[100, 100, 100]} position={[-300, 0, 0]} id="foo" />
      <Shape scale={[100, 100, 100]} position={[300, 0, 0]} id="bar" />
    </>
  );
}
