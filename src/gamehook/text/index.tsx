import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useMemo } from "react";

import DefaultFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { createMaterial } from "../materials";
import { Meshable } from "../mesh/types";
import { useMesh } from "../mesh/hooks";

interface Props extends Meshable {
  font?: object;
  renderMethod?: "dom" | "proceduralText";
  computeOffset?: boolean;
  value: string;
}

const loader = new FontLoader();

function ProceduralText(props: Props) {
  const { children, font = DefaultFont, computeOffset = true, value } = props;
  const loadedFont = useMemo(() => {
    return loader.parse(font);
  }, [font]);

  const geometry = useMemo<TextGeometry>(() => {
    const geometry = new TextGeometry(value, {
      font: loadedFont,
      size: 16,
      height: 1,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    geometry.computeBoundingBox();
    return geometry;
  }, [value, loadedFont]);

  const threeMesh = useMemo<THREE.Mesh>(() => {
    return new THREE.Mesh(
      geometry,
      createMaterial({
        type: "normal",
      })
    );
  }, [geometry]);
  useMesh({ threeMesh, computeOffset, ...props });
  return <>{children}</>;
}

export function Text(props: Props) {
  const { renderMethod = "proceduralText" } = props;
  switch (renderMethod) {
    case "dom":
      // Not implemented
      return <></>;
    default:
      // ProceduralText
      return <ProceduralText {...props} />;
  }
}
