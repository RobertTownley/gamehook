import { ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  title: string;
}

export const Scene = ({ children, title }: SceneProps) => {
  return (
    <div>
      <p>{title}</p>
      {children}
    </div>
  );
};
