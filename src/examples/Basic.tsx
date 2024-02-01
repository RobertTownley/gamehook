import { Scene, Shape } from "gamehook";

export function BasicExample() {
  return (
    <Scene>
      <Shape rotation={[0.005, 0.005, 0.005]} />
    </Scene>
  );
}
