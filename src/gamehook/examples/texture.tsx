import { Box, Light, Scene } from "../../gamehook";

export function TextureExample() {
  return (
    <Scene>
      <Box
        width={5}
        height={5}
        depth={5}
        rotation={{ x: 0.01, y: 0.01, z: 0.01 }}
        material={{
          type: "standard",
          color: 0xffffff,
          textures: {
            colorMap:
              "https://r105.threejsfundamentals.org/threejs/resources/images/wall.jpg",
          },
        }}
      />
      <Light type="ambient" />
    </Scene>
  );
}
