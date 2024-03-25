import { Fog, Scene, Shape } from "gamehook";

export function FogExample() {
  return (
    <Scene backgroundColor={0xcccccc}>
      <Fog variant="exponential" color={0xcccccc} density={0.002} />
      <Shape />
      <Shape position={[-2, 2, -20]} />
      <Shape scale={[100, 0.1, 100]} position={[0, -2, 0]} />
    </Scene>
  );
}
