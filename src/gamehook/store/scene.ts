import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameObject } from "../objects/types";

interface SceneState {
  objects: GameObject[];
  sceneTitle: string;
}

const getInitialState = (): SceneState => {
  return {
    objects: [],
    sceneTitle: "Loading",
  };
};

export const sceneSlice = createSlice({
  name: "scene",
  initialState: getInitialState(),
  reducers: {
    addObjectToScene(state, action: PayloadAction<GameObject>) {
      state.objects.push(action.payload);
      return state;
    },
    setSceneTitle(state, action: PayloadAction<string>) {
      state.sceneTitle = action.payload;
      return state;
    },
  },
});
export const { setSceneTitle } = sceneSlice.actions;
export default sceneSlice.reducer;
