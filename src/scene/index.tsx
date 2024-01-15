import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function Scene({ children }: Props) {
  return <>{children}</>;
}
