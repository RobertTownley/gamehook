import { Button, createTheme, Scene, Text } from "../../gamehook";

const theme = createTheme({
  colors: {
    primary: {
      base: 0x00aaff,
      light: 0x22ccff,
      dark: 0x264653,
    },
    text: {
      base: 0xe9c46a,
      light: 0xe9c46a,
      dark: 0xe9c46a,
    },
  },
});

export function ButtonExample() {
  return (
    <Scene theme={theme}>
      <Button
        position={{ x: 0, y: 2, z: 0 }}
        onClick={() => console.log("WHEE")}
        value="Click me!"
      />
    </Scene>
  );
}
