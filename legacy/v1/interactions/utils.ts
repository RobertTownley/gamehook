import * as THREE from "three";

export const getVerticesForObject = (obj: THREE.Mesh): THREE.Vector3[] => {
  const bufferVertices = obj.geometry.attributes.position.array;
  const vertices: THREE.Vector3[] = [];

  for (let i = 0; i < bufferVertices.length; i += 3) {
    vertices.push(
      new THREE.Vector3(
        bufferVertices[i] + obj.position.x,
        bufferVertices[i + 1] + obj.position.y,
        bufferVertices[i + 2] + obj.position.z
      )
    );
  }
  return vertices;
};
