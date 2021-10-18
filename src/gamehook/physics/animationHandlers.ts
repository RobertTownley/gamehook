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

export const moveObjects = () => {
  Object.values(_GAME.scene.gameObjects)
    .filter((gameObject) => gameObject.velocity !== undefined)
    .forEach((gameObject) => {
      if (!gameObject.velocity) return;
      const { x, y, z } = gameObject.velocity;
      if (x) gameObject.three.position.x += x;
      if (y) gameObject.three.position.y += y;
      if (z) gameObject.three.position.z += z;
    });
};

export const accelerateObjects = () => {
  Object.values(_GAME.scene.gameObjects)
    .filter((gameObject) => gameObject.acceleration !== undefined)
    .forEach((gameObject) => {
      if (!gameObject.acceleration) return;
      if (!gameObject.velocity) {
        gameObject.velocity = {
          x: 0,
          y: 0,
          z: 0,
        };
      }
      const { x, y, z } = gameObject.acceleration;
      if (x) gameObject.velocity.x += x;
      if (y) gameObject.velocity.y += y;
      if (z) gameObject.velocity.z += z;
    });
};
