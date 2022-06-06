import { GameModel } from "./types";

export function animateModels(models: Record<string, GameModel>) {
  Object.values(models).forEach((model) => {
    if (model.status !== "loaded") return;
    model.mixer.update(model.clock.getDelta());
  });
}
