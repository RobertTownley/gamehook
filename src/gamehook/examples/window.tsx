import { Box, Scene } from "../../gamehook";

export function WindowExample() {
  return (
    <div style={{ display: "flex" }}>
      <Scene>
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
