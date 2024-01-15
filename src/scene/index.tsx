import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function Scene({ children }: Props) {
  return (
    <div>
      <p>This is a gamehook scene V2</p>
      {children}
    </div>
  );
}
