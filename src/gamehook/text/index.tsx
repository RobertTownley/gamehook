import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useMemo } from "react";

import DefaultFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { createMaterial } from "../materials";
import { Meshable } from "../mesh/types";
import { useMesh } from "../mesh/hooks";
import { HierarchyContext, useHierarchy } from "../hierarchy";

interface Props extends Meshable {
  font?: object;
  size?: number;
  height?: number;
  renderMethod?: "dom" | "proceduralText";
  computeOffset?: boolean;
  bevelOffset?: number;
  bevelSegments?: number;
  value: string;
}

const loader = new FontLoader();

function ProceduralText(props: Props) {
  const {
    children,
    font = DefaultFont,
    computeOffset = true,
    value,
    size = 2,
    height = 0.5,
    bevelOffset = 0,
    bevelSegments = 0,
    material,
  } = props;
  const loadedFont = useMemo(() => {
    return loader.parse(font);
  }, [font]);

  const geometry = useMemo<TextGeometry>(() => {
    const geometry = new TextGeometry(value, {
      font: loadedFont,
      size,
      height,
      bevelOffset,
      bevelSegments,
    });
    geometry.computeBoundingBox();
    return geometry;
  }, [bevelOffset, bevelSegments, height, loadedFont, size, value]);

  const threeMaterial = useMemo(() => {
    return createMaterial(material ?? { type: "normal" });
  }, [material]);

  const threeMesh = useMemo<THREE.Mesh>(() => {
    const threeMesh = new THREE.Mesh(geometry, threeMaterial);
    if (computeOffset) {
      threeMesh.geometry.computeBoundingBox();
      threeMesh.geometry.center();
    }
    return threeMesh;
  }, [computeOffset, geometry, threeMaterial]);

  const mesh = useMesh({ threeMesh, ...props });
  const hierarchyValue = useHierarchy(children, mesh);
  return (
    <HierarchyContext.Provider value={hierarchyValue}>
      {children}
    </HierarchyContext.Provider>
  );
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
