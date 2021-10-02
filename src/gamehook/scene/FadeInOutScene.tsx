import { ReactNode, useContext, useEffect, useState } from "react";

import { AmbientLight } from "../lights/AmbientLight";
import { Scene } from "../scene";
import { getAnimatedValue } from "../animation";
import { useTimeline } from "../hooks";
import { RouterContext } from "../router";

type SceneChanger = () => void;
interface Props {
  children: ReactNode;
  startFadeIn: number;
  finishFadeIn: number;
  startFadeOut?: number;
  finishFadeOut?: number;
  nextScene: string | SceneChanger;
  delayExit?: number;
}

/* A scene that fades in and (optionally) fades out
 *
 * This is a convenience method around adding an ambient light to
 * the scene, whose brightness fades in and out according to the supplied
 * props.
 *
 * When the scene has finished its animation, the `onComplete` callback
 * is called.
 *
 * This is particularly useful for scenes such as the beginning of games,
 * where the studio's credits and attributions fade in and out.
 * */
export const FadeScene = ({
  children,
  delayExit = 1000,
  startFadeIn,
  finishFadeIn,
  startFadeOut,
  finishFadeOut,
  nextScene,
}: Props) => {
  const START_COLOR = 0x000000;
  const END_COLOR = 0xffffff;
  const [color, setColor] = useState(START_COLOR);
  const routerContext = useContext(RouterContext);

  // Fade-In
  useTimeline(
    (completion) => {
      const newColor = getAnimatedValue(START_COLOR, END_COLOR, completion);
      setColor(newColor);
    },
    startFadeIn,
    finishFadeIn,
    10
  );

  // Fade-Out
  useTimeline(
    (completion) => {
      if (!startFadeOut || !finishFadeOut) return;

      const newColor = getAnimatedValue(END_COLOR, START_COLOR, completion);
      setColor(newColor);
    },
    startFadeOut || startFadeIn,
    finishFadeOut || finishFadeIn,
    10
  );

  // Call the nextScene callback when complete
  useEffect(() => {
    const finished = finishFadeOut || finishFadeIn;
    setTimeout(() => {
      if (typeof nextScene === "string") {
        routerContext.setSceneKey(nextScene);
      } else {
        nextScene();
      }
    }, finished + delayExit);
  }, [delayExit, finishFadeIn, finishFadeOut, routerContext, nextScene]);
  return (
    <Scene>
      <AmbientLight color={color} />
      {children}
    </Scene>
  );
};
