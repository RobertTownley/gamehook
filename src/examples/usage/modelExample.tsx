import { defaultPosition } from "../../gamehook/objects/defaults";
import { Model } from "../../gamehook/objects/model";
import { ObjectPosition } from "../../gamehook/objects/types";

interface Props {
  position?: ObjectPosition;
}

export const ModelExample = ({ position = defaultPosition }: Props) => {
  return <Model filepath={"/assets/GamehookCube.glb"} position={position} />;
};
