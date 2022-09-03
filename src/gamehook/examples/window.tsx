import { Box, Scene } from "../../gamehook";

export function WindowExample() {
  return (
    <div style={{ display: "flex", flexBasis: 1, flexDirection: "column" }}>
      <div style={{ width: "200px" }}>Hello</div>
      <Scene height={500} antialias={false}>
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={7}
          height={7}
          depth={7}
        />
      </Scene>
      <Scene height={500}>
        <Box
          rotation={{ x: 0.0025, y: 0.0025, z: 0 }}
          width={7}
          height={7}
          depth={7}
        />
      </Scene>
    </div>
  );
}
