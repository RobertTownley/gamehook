import { ReactNode, useMemo } from "react";

import { RenderContext } from "./context";
import { useCreateRenderer } from "./hooks";

interface Props {
  children: ReactNode;
}
export function RenderProvider({ children }: Props) {
  const { render, renderer } = useCreateRenderer();
  const value = useMemo(() => {
    return { render, renderer };
  }, [render, renderer]);
  return (
    <RenderContext.Provider value={value}>{children}</RenderContext.Provider>
  );
}
