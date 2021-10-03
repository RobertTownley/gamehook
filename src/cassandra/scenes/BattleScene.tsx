import { useEffect } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { AmbientLight, CameraControl, Mesh, Scene, Text } from "../../gamehook";

const Floor = () => {
  return (
    <Mesh
      geometry={{
        type: "box",
        width: 200,
        height: 200,
        depth: 0.2,
      }}
      material={{
        type: "normal",
      }}
      position={[3, 3, 0]}
    />
  );
};

const UnitComponent = ({ unit }: { unit: Unit }) => {
  useEffect(() => {
    console.log(unit);
  }, [unit]);

  return <></>;
};

export const BattleScene = () => {
  const game = new Game({ pointValue: 1000 });
  useEffect(() => {
    if (!game.players.length) return;
    setTimeout(() => {
      console.log("Adding");
      game.players[0].army.units.push({
        id: generateUUID(),
        health: 20,
        pointValue: 50,
      });
    }, 2000);
  }, [game.players]);

  return (
    <Scene>
      <CameraControl step={10} initialPosition={[0, 0, 100]} />
      <AmbientLight />
      <Text value="Battle" />
      {game.players.map((player) => {
        const units = player.army.units;
        return (
          <>
            {units.map((unit) => (
              <UnitComponent unit={unit} />
            ))}
          </>
        );
      })}
      <Floor />
    </Scene>
  );
};

// Battle Logic
interface Player {
  id: string;
  army: Army;
}

interface Unit {
  id: string;
  pointValue: number;
  health: number;
}

interface Army {
  id: string;
  units: Unit[];
}

interface GameParams {
  pointValue?: number;
  maxNumberOfPlayers?: number;
}

class Game {
  id: string;
  maxNumberOfPlayers: number;
  players: Player[];
  pointValue: number;

  constructor({ maxNumberOfPlayers, pointValue }: GameParams) {
    this.id = generateUUID();
    this.maxNumberOfPlayers = maxNumberOfPlayers || 2;
    this.players = [];
    this.pointValue = pointValue || 1000;
  }

  addPlayerToGame(player: Player) {
    this.players.push(player);
  }
  removePlayerFromGame(player: Player) {
    this.players = this.players.filter((p) => p.id !== player.id);
  }
  addUnitToArmy(unit: Unit, player: Player) {
    player.army.units.push(unit);
  }
  removeUnitFromArmy(unit: Unit, player: Player) {
    player.army.units = player.army.units.filter((u) => u.id !== unit.id);
  }
}
