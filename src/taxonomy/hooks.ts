import { useEffect } from "react";
import * as THREE from "three";

import { Nameable } from "./types";

export function useTaxonomy(obj: THREE.Object3D, props: Nameable) {
  const { id, name, tags } = props;
  const { userData } = obj;

  useEffect(() => {
    userData["id"] = id;
  }, [userData, id]);

  useEffect(() => {
    userData["name"] = name;
  }, [userData, name]);

  useEffect(() => {
    userData["tags"] = tags;
  }, [userData, tags]);
}
