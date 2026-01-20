import { Sneakers3DStateType, MeshesType } from "@/const/types";
import { create } from "zustand";



const defaultItems: Record<MeshesType, string> = {
  laces: "#FFFFFF",
  mesh: "pink",
  caps: "#E75480",
  inner: "gray",
  sole: "#FFFFFF",
  stripes: "gray",
  band: "#FFFFFF",
  patch: "#FFFFFF",
};

export const use3DSneakersStore = create<Sneakers3DStateType>((set) => ({
  current: null,
  items: defaultItems,

  setCurrent: (mesh) => set({ current: mesh }),

  setColor: (color) =>
    set((state) => {
      if (!state.current) return state;
      return {
        items: {
          ...state.items,
          [state.current]: color,
        },
      };
    }),
}));
