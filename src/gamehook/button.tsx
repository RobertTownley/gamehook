import { useState } from "react";
import { Container, Text, useTheme, XYZ } from "../gamehook";

interface Props {
  onClick: () => void;
  position?: XYZ;
  value: string;
}

export function Button({ onClick, position, value }: Props) {
  const theme = useTheme();
  const { base, light } = theme.colors.primary;
  const [color, setColor] = useState(base);

  return (
    <Container
      onHoverEnter={() => setColor(light)}
      onHoverLeave={() => setColor(base)}
      onClick={onClick}
    >
      <Text
        value={value}
        position={position}
        material={{ type: "basic", color }}
      />
    </Container>
  );
}
