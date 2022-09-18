import { Material } from "three";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Container } from "../container";
import { MaterialOptions } from "../materials/types";
import { Text } from "../text";

interface Props {
  activePlaceholder?: string;
  activeMaterial?: MaterialOptions | Material;
  disabled?: boolean;
  hoveredMaterial?: MaterialOptions | Material;
  material?: MaterialOptions | Material;
  disablePointer?: boolean;
  placeholder?: string;
  maxLength?: number;
  type: "text";

  onChange?: (event: KeyboardEvent) => void;
}

/* TODO: This is an unhappy workaround that won't work for either a11y reasons or mobile
 * responsiveness. I need to find something better for inputs here */
export function Input({
  activePlaceholder,
  disabled = false,
  material,
  maxLength,
  activeMaterial,
  hoveredMaterial,
  disablePointer,
  placeholder,
  onChange,
}: Props) {
  const [isActive, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState("");

  const m: MaterialOptions | Material = useMemo(() => {
    if (isActive && activeMaterial) return activeMaterial;
    if (hovered && hoveredMaterial) return hoveredMaterial;
    return material ?? { type: "normal" };
  }, [isActive, activeMaterial, hovered, hoveredMaterial, material]);

  const displayText = (() => {
    if (isActive && !value) {
      return activePlaceholder ?? "_____";
    }
    return value.length > 0 ? value : placeholder ?? "_____";
  })();

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (["Enter", "Escape"].includes(event.key)) {
        setActive(false);
      } else if (isActive && !disabled) {
        setValue((current) => getNewValue(event, current, maxLength));
      }
      if (onChange) {
        onChange(event);
      }
    },
    [isActive, disabled, onChange, maxLength]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      setActive(true);
    }
  }, [disabled]);

  useEffect(() => {
    if (!disablePointer && !disabled) {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }
  }, [disablePointer, disabled, hovered]);

  return (
    <Container
      onHoverEnter={() => setHovered(true)}
      onHoverLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Text value={displayText} onKeyDown={handleKey} material={m} />
    </Container>
  );
}

const ignoredKeys = [
  "Alt",
  "Control",
  "Enter",
  "Meta",
  "Shift",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Help",
  "Home",
  "PageUp",
  "PageDown",
];
function getNewValue(
  event: KeyboardEvent,
  formerValue: string,
  maxLength: number | undefined
): string {
  if (ignoredKeys.includes(event.key)) {
    return formerValue;
  } else if (event.key === "Backspace") {
    return formerValue.slice(0, -1);
  } else if (event.key === "Delete") {
    return formerValue.slice(1);
  } else if (maxLength && formerValue.length >= maxLength) {
    return formerValue;
  } else {
    return formerValue + event.key;
  }
}
