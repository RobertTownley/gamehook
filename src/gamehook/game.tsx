import { ReactNode } from "react";

interface GameProps {
  children: ReactNode;
  initialSceneTitle: string;
}

export const Game = ({ children }: GameProps) => {
  return (
    <div>
      <p>Game</p>
      {children}
    </div>
  );
};
