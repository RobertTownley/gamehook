import { ReactNode, useMemo } from "react";

import { RenderContext } from "./context";
import { useCreateRenderer } from "./hooks";

interface Props {
  children: ReactNode;
  alpha?: boolean;
  clearColor?: number;
  clearOpacity?: number;
}
export function RenderProvider({
  alpha,
  clearColor,
  clearOpacity,
  children,
}: Props) {
  const { render, renderer } = useCreateRenderer({
    alpha,
    clearColor,
    clearOpacity,
  });
  const value = useMemo(() => {
    return { render, renderer };
  }, [render, renderer]);
  return (
    <RenderContext.Provider value={value}>{children}</RenderContext.Provider>
  );
}
