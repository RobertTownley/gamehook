// Determine canvas height be examining breakpoint
interface CanvasDimensions {
  height: number;
  width: number;
}

export const getCanvasDimensions = (): CanvasDimensions => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
