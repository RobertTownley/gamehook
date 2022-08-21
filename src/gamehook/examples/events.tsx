import { useState } from "react";
import {
  Box,
  Scene,
  Text,
  createEvent,
  useEventListener,
} from "../../gamehook";

// Example

interface SampleEvent {
  foo: string;
}
const sampleEvent = createEvent<SampleEvent>("Sample Event");

function Emitter() {
  const handleClick = () => {
    sampleEvent.emit({
      foo: "BAR 2",
    });
  };
  return <Box onClick={handleClick} position={{ x: -5, y: 0, z: 0 }} />;
}

function Listener() {
  const RED = 0xff0000;
  const BLUE = 0x0000ff;
  const [color, setColor] = useState(RED);
  useEventListener(sampleEvent, (_data) => {
    setColor(color === RED ? BLUE : RED);
  });
  return (
    <Box material={{ type: "basic", color }} position={{ x: 5, y: -2, z: 0 }} />
  );
}

function ListenerTwo() {
  const RED = 0xff0000;
  const GREEN = 0x00ff00;
  const [color, setColor] = useState(RED);
  useEventListener(sampleEvent, (_data) => {
    setColor(color === RED ? GREEN : RED);
  });
  return (
    <Box material={{ type: "basic", color }} position={{ x: 5, y: 2, z: 0 }} />
  );
}

export function EventsExample() {
  return (
    <Scene>
      <Emitter />
      <Listener />
      <ListenerTwo />
      <Text
        value="Click me"
        size={1}
        position={{ x: -5, y: -2, z: 0 }}
        height={0.01}
      />
    </Scene>
  );
}
