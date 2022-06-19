import { normalizeXYZ } from "../physics";
import { LoadedGameModel } from "./types";

export function animateAndMoveModels(models: Record<string, LoadedGameModel>) {
  Object.values(models).forEach((model) => {
    if (model.status !== "loaded") return;
    model.mixer.update(model.clock.getDelta());

    // Move models
    if (model.velocity) {
      const v = normalizeXYZ(model.velocity);
      model.gltf.scene.position.x += v[0];
      model.gltf.scene.position.y += v[1];
      model.gltf.scene.position.z += v[2];
    }

    // Rotate models
    if (model.rotation) {
      const o = normalizeXYZ(model.rotation);
      model.gltf.scene.rotation.x += o[0];
      model.gltf.scene.rotation.y += o[1];
      model.gltf.scene.rotation.z += o[2];
    }
  });
}
