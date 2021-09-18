import * as THREE from "three";
import { Provider } from "react-redux";
import { ReactNode, useEffect, useRef } from "react";

import { useAnimation } from "./hooks";
import { store, useAppDispatch } from "./store";
import { setSceneTitle } from "./store/scene";

interface GameProps {
  children: Array<ReactNode>;
  initialSceneTitle: string;
}

const Stage = ({ children }: GameProps) => {
  const dispatch = useAppDispatch();
  return <>{children}</>;
};

export const Game = (props: GameProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x00aaff });
  const cube = useRef(new THREE.Mesh(geometry, material));
  const [width, height] = [window.innerWidth / 2, window.innerHeight / 2];

  const renderer = useRef(new THREE.WebGLRenderer());
  const scene = useRef(new THREE.Scene());
  scene.current.add(cube.current);
  const camera = useRef(new THREE.PerspectiveCamera(75, width / height));
  camera.current.position.z = 5;

  const light = useRef(new THREE.DirectionalLight(0xffffff, 1));
  light.current.position.set(0, 10, 0);
  light.current.target.position.set(-5, 0, 0);
  scene.current.add(light.current);
  scene.current.add(light.current.target);

  useEffect(() => {
    const currentRenderer = renderer.current;
    const existingRef = mountRef.current;

    mountRef.current?.appendChild(renderer.current.domElement);

    const onWindowResize = () => {
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(width, height);
    };
    onWindowResize();

    return () => {
      existingRef?.removeChild(currentRenderer.domElement);
    };
  });

  useAnimation(() => {
    cube.current.rotation.x += 0.01;
    cube.current.rotation.y += 0.01;
    cube.current.rotation.z += 0.01;
    renderer.current.render(scene.current, camera.current);
  });

  // TODO: Find and save to state active scene based on scene title
  const realScene = props.children[0];

  return (
    <Provider store={store}>
      <div ref={mountRef} />
      <Stage {...props}>
        <h2>Game</h2>
        <div>{realScene}</div>
      </Stage>
    </Provider>
  );
};
