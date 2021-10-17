// Rotate all objects that have a rotation attribute set
export const rotateObjects = () => {
  Object.values(_GAME.scene.gameObjects)
    .filter((gameObject) => gameObject.rotation !== undefined)
    .forEach((gameObject) => {
      if (!gameObject.rotation) return;
      const { x, y, z } = gameObject.rotation;
      if (x) gameObject.three.rotateX(x);
      if (y) gameObject.three.rotateY(y);
      if (z) gameObject.three.rotateZ(z);
    });
};
