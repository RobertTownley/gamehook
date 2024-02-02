import { useCallback, useEffect } from "react";
import * as THREE from "three";

import { useSceneDetails } from "../scene/hooks";
import { useCamera } from "../camera/hooks";

import { Interactable, InteractionStore } from "./types";
import { getMouse } from "./raycaster";

export function useInteraction(obj: THREE.Object3D, props: Interactable) {
  const { scene } = useSceneDetails();
  const { onClick, onHoverEnter, onHoverExit } = props;
  const interactions: InteractionStore = scene.userData.interactions;

  useEffect(() => {
    if (onClick) {
      interactions.onClick[obj.id] = [obj, onClick];
    }
    return () => {
      delete interactions.onClick[obj.id];
    };
  }, [obj, interactions, onClick]);

  useEffect(() => {
    if (onHoverEnter) {
      interactions.onHoverEnter[obj.id] = [obj, onHoverEnter];
    }
    return () => {
      delete interactions.onHoverEnter[obj.id];
    };
  }, [obj, interactions, onHoverEnter]);

  useEffect(() => {
    if (onHoverExit) {
      interactions.onHoverExit[obj.id] = [obj, onHoverExit];
    }
    return () => {
      delete interactions.onClick[obj.id];
    };
  }, [obj, interactions, onHoverExit]);

  // Keyboard
  const { onKeyDown } = props;
  useEffect(() => {
    if (onKeyDown) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      if (onKeyDown) {
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [onKeyDown]);
}

export function useInteractionListeners() {
  const { camera } = useCamera();
  const { scene } = useSceneDetails();
  const interactions: InteractionStore = scene.userData.interactions;

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const mouse = getMouse(event);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const clickEntries = Object.values(interactions.onClick);
      const targets = clickEntries.map((o) => o[0]);
      const intersections = raycaster.intersectObjects(targets, true);
      if (intersections.length > 0) {
        const first = intersections[0];
        const entry = clickEntries.find((t) => t[0].id === first.object.id);
        if (entry) {
          const callback = entry[1];
          callback(event);
        }
      }
    },
    [camera, interactions]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const mouse = getMouse(event);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const hoverEnterEntries = Object.values(interactions.onHoverEnter);
      const hoverExitEntries = Object.values(interactions.onHoverExit);
      const targets = [
        ...Object.values(interactions.onHoverEnter).map((i) => i[0]),
        ...Object.values(interactions.onHoverExit).map((i) => i[0]),
      ];
      const intersections = raycaster.intersectObjects(targets);

      // Find objects no longer hovered over
      const intersectedObjs = intersections.map((i) => i.object);
      hoverExitEntries.forEach((entry) => {
        if (!intersectedObjs.includes(entry[0])) {
          const callback = entry[1];
          callback(event);
        }
      });

      // Find newly hovered items
      intersections.forEach((intersection) => {
        const entry = hoverEnterEntries.find(
          (e) => e[0].id === intersection.object.id
        );
        if (entry) {
          const callback = entry[1];
          callback(event);
        }
      });
    },
    [camera, interactions]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      removeEventListener("click", handleClick);
      removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleClick, handleMouseMove]);
}
