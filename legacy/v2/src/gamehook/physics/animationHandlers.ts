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

  const { camera } = _GAME.scene;
  if (camera.rotation) {
    const { x, y, z } = camera.rotation;
    if (x) camera.three.rotateX(x);
    if (y) camera.three.rotateY(y);
    if (z) camera.three.rotateZ(z);
  }
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

  const { camera } = _GAME.scene;
  if (camera.velocity) {
    const { x, y, z } = camera.velocity;
    if (x) camera.three.position.x += x;
    if (y) camera.three.position.y += y;
    if (z) camera.three.position.z += z;
  }
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

  const { camera } = _GAME.scene;
  if (camera.acceleration) {
    if (!camera.velocity) {
      camera.velocity = {
        x: 0,
        y: 0,
        z: 0,
      };
    }
    const { x, y, z } = camera.acceleration;
    if (x) camera.velocity.x += x;
    if (y) camera.velocity.y += y;
    if (z) camera.velocity.z += z;
  }
};
