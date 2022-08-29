import { useState } from "react";
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
      light: 0xffd57b,
      dark: 0xe9c46a,
    },
  },
});

export function ButtonExample() {
  const [showOther, setShowOther] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  return (
    <Scene theme={theme}>
      <Button
        position={{ x: 0, y: 3, z: 0 }}
        onClick={() => setShowOther(!showOther)}
        value="I am a button"
      />
      {showOther && (
        <Button
          position={{ x: 0, y: 0, z: 0 }}
          onClick={() => setShowFinal(!showFinal)}
          value="So am I"
        />
      )}
      {showFinal && (
        <Text
          position={{ x: 0, y: -3, z: 0 }}
          onClick={() => setShowFinal(!showFinal)}
          value="I am not"
        />
      )}
    </Scene>
  );
}
