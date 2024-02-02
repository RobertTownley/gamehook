import { useCallback, useEffect } from "react";
import * as THREE from "three";

import { useSceneDetails } from "../scene/hooks";
import { useCamera } from "../camera/hooks";

import { Interactable, InteractionStore } from "./types";
import { useRender } from "../render/hooks";

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
}

export function useInteractionListeners(scene: THREE.Scene) {
  const interactions: InteractionStore = scene.userData.interactions;
  const { renderer } = useRender();
  const { camera } = useCamera();

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = -(event.clientY / height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const targets = Object.values(interactions.onClick).map((o) => o[0]);
      const intersections = raycaster.intersectObjects(targets, true);
      if (intersections.length > 0) {
        console.log("GOT ONE");
      }
    },
    [camera, interactions]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = -(event.clientY / height) * 2 + 1;
      console.log(mouse);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const hoverEnterEntries = Object.values(interactions.onHoverEnter);
      const targets = hoverEnterEntries.map((o) => {
        const obj = o[0];
        obj.updateMatrixWorld();
        return obj;
      });

      // Find newly hovered items
      const intersections = raycaster.intersectObjects(targets, true);
      if (intersections.length > 0) {
        const first = intersections[0];
        const entry = hoverEnterEntries.find(
          (x) => x[0].id === first.object.id
        );
        if (entry) {
          entry[0].userData["hovered"] = true;
          const callback = entry[1];
          callback();
        }
      }

      // Find objects no longer hovered over
      const hoverExitEntries = Object.values(interactions.onHoverExit);
      const priorHovers = hoverExitEntries.filter((o) => {
        return o[0].userData["hovered"] === true;
      });
      const intersectObjs = intersections.map((i) => i.object);
      const staleHovers = priorHovers.filter((o) => {
        return !intersectObjs.includes(o[0]);
      });
      staleHovers.forEach((entry) => {
        const obj = entry[0];
        obj.userData["hovered"] = false;
        const callback = entry[1];
        if (callback) {
          callback();
        }
      }, []);
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
