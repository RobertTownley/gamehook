import { useCallback, useEffect, useMemo, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons";

import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { useInteraction } from "../interactions/hooks";
import { useLighting } from "../lights/hooks";
import { usePhysics } from "../physics/hooks";
import { useAddToScene } from "../scene/hooks";
import { useTaxonomy } from "../taxonomy/hooks";
import { useModelMaterial } from "../materials/hooks";

import { DefaultModelURL } from "./constants";
import { ModelProps } from "./types";

const loader = new GLTFLoader();

export function Model(props: ModelProps) {
  const { url = DefaultModelURL, onLoad, onProgress, onError } = props;
  const [data, setData] = useState<GLTF | undefined>(undefined);

  const handleLoad = useCallback(
    (data: GLTF) => {
      if (onLoad) {
        onLoad(data);
      }
      setData(data);
    },
    [onLoad]
  );

  const handleProgress = useCallback(
    (event: ProgressEvent<EventTarget>) => {
      if (onProgress) {
        onProgress(event);
      }
    },
    [onProgress]
  );

  const handleError = useCallback(
    (err: unknown) => {
      if (onError) {
        onError(err);
      }
    },
    [onError]
  );

  useEffect(() => {
    loader.load(url, handleLoad, handleProgress, handleError);
  }, [url, handleLoad, handleProgress, handleError]);

  if (!data) return null;
  return <LoadedModel data={data} {...props} />;
}

interface LoadedModelProps extends ModelProps {
  data: GLTF;
}
function LoadedModel(props: LoadedModelProps) {
  const { children, data } = props;
  const obj = useMemo(() => {
    return data.scene;
  }, [data.scene]);

  const parent = useHierarchy(obj);
  useAddToScene({ obj, parent });
  useInteraction(obj, props);
  useLighting(obj, props);
  useModelMaterial(obj, props);
  usePhysics(obj, props);
  useTaxonomy(obj, props);

  return (
    <HierarchyContext.Provider
      value={{ animations: data.animations, parent: obj }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}
