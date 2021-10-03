import { GameScene } from "../../gamehook/scene";
import {
  AmbientLight,
  BasicMeshType,
  useGameRouter,
  Scene,
  Text,
} from "../../gamehook";

interface SceneChangeButtonProps extends BasicMeshType {
  label: string;
  nextScene: string;
}
const SceneChangeButton = ({
  label,
  nextScene,
  ...props
}: SceneChangeButtonProps) => {
  const router = useGameRouter();
  const handleClick = () => {
    console.log("A CLICK");
    router.changeScene(nextScene);
  };
  return <Text value={label} onClick={handleClick} {...props} />;
};

export const TitleScene: GameScene = () => {
  return (
    <Scene>
      <AmbientLight />
      <SceneChangeButton
        label="Demo Battle Scene"
        nextScene="Battle"
        position={[-2, 0, 0]}
      />
      <SceneChangeButton
        label="Back"
        nextScene="Initial"
        position={[2, 0, 0]}
      />
    </Scene>
  );
};
