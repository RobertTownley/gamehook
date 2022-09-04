import { Box, Scene } from "../../gamehook";

export function WindowExample() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} id="foobar">
      <Scene width="75%">
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={7}
          height={7}
          depth={7}
        />
      </Scene>
      <Scene width="25%">
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={7}
          height={7}
          depth={7}
        />
      </Scene>
      <Scene width="25%">
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={2}
          height={2}
          depth={2}
        />
      </Scene>
      <Scene width="25%" antialias={false}>
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={2}
          height={2}
          depth={2}
        />
      </Scene>
      <Scene width="25%">
        <Box
          rotation={{ x: 0.025, y: 0.025, z: 0 }}
          width={2}
          height={2}
          depth={2}
        />
      </Scene>
      <Scene width="25vw">
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={2}
          height={2}
          depth={2}
        />
      </Scene>
    </div>
  );
}
