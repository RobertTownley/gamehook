import { Scene, Shape } from "gamehook";

export function BasicExample() {
  return (
    <Scene>
      <Shape geometry={{ type: "sphere" }} />
    </Scene>
  );
}
