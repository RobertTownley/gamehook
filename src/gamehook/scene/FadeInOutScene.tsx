import { ReactNode, useState } from "react";
import { Scene } from "../scene";

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
  const [color, setColor] = useState(0x000000);
  return <Scene>{children}</Scene>;
};
