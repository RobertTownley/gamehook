import { Dispatch, SetStateAction, useState } from "react";

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
    router.changeScene(nextScene, {});
  };
  return <Text value={label} onClick={handleClick} {...props} />;
};

interface PlayerSelectProps {
  playerCount: number;
  setPlayerCount: Dispatch<SetStateAction<number>>;
}
const PlayerSelect = ({ playerCount, setPlayerCount }: PlayerSelectProps) => {
  const options = [1, 2, 3, 4];
  return (
    <>
      <Text value="Players" position={[-1.5, 1.25, 0]} />
      {options.map((option, index) => (
        <Text
          key={option}
          value={option.toString()}
          material={{
            type: "basic",
            color: playerCount === option ? 0x00aaff : 0xffffff,
          }}
          position={[0.5 + index * 0.5, 1.25, 0]}
          onClick={() => setPlayerCount(option)}
        />
      ))}
    </>
  );
};

interface ForceSizeSelectProps {
  pointValue: number;
  setPointValue: Dispatch<SetStateAction<number>>;
}
const ForceSizeSelect = ({
  pointValue,
  setPointValue,
}: ForceSizeSelectProps) => {
  const INCREMENT = 50;
  const MINIMUM = 250;
  const MAXIMUM = 2500;

  return (
    <>
      <Text value="Force Size" position={[-1.5, 0, 0]} />
      <Text value={`${pointValue.toString()} points`} position={[1, 0, 0]} />
      <Text
        value="+"
        position={[2.25, 0.25, 0]}
        onClick={() => {
          setPointValue((prev) => (prev < MAXIMUM ? prev + INCREMENT : prev));
        }}
      />
      <Text
        value="–"
        position={[2.25, -0.25, 0]}
        onClick={() => {
          setPointValue((prev) => (prev > MINIMUM ? prev - INCREMENT : prev));
        }}
      />
    </>
  );
};

const NewGameMenu = () => {
  const router = useGameRouter();
  const [playerCount, setPlayerCount] = useState(2);
  const [pointValue, setPointValue] = useState(1000);

  const handleStartGame = () => {
    router.changeScene("Force Selection", { playerCount, pointValue });
  };
  return (
    <>
      <Text value="New Game" position={[0, 2, 1]} />
      <PlayerSelect playerCount={playerCount} setPlayerCount={setPlayerCount} />
      <ForceSizeSelect pointValue={pointValue} setPointValue={setPointValue} />
      <Text
        value="Start Game"
        onClick={handleStartGame}
        material={{ color: 0x00aaff, type: "basic" }}
        position={[0, -1.5, 0]}
      />
    </>
  );
};

export const TitleScene: GameScene = () => {
  const [showMenu, setShowMenu] = useState(true);
  const handleNewGameClick = () => setShowMenu(true);

  return (
    <Scene>
      <AmbientLight />
      {showMenu && <NewGameMenu />}
      {!showMenu && (
        <>
          <Text value="New Game" onClick={handleNewGameClick} />
          <SceneChangeButton
            label="Back"
            nextScene="Initial"
            position={[2, 0, 0]}
          />
        </>
      )}
    </Scene>
  );
};
