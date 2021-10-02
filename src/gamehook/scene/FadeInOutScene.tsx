import { ReactNode, useState } from "react";

import { AmbientLight } from "../lights/AmbientLight";
import { Scene } from "../scene";
import { getAnimatedValue } from "../animation";
import { useTimeline } from "../hooks";

type SceneChanger = () => void;
interface Props {
  children: ReactNode;
  startFadeIn: number;
  finishFadeIn: number;
  startFadeOut?: number;
  finishFadeOut?: number;
  nextScene: string | SceneChanger;
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
export const FadeScene = ({ children }: Props) => {
  const START_COLOR = 0x000000;
  const END_COLOR = 0xffffff;
  const [color, setColor] = useState(START_COLOR);

  useTimeline(
    (completion) => {
      const newColor = getAnimatedValue(START_COLOR, END_COLOR, completion);
      setColor(newColor);
    },
    1000,
    5000,
    100
  );
  return (
    <Scene>
      <AmbientLight color={color} />
      {children}
    </Scene>
  );
};
