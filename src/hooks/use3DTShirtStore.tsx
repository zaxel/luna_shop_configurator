import { products } from "@wix/stores";
import { create } from "zustand";

type TShirt3DStoreType = {
  decalOpen: boolean;
  setDecalOpen: (state: boolean) => void;
};

export const use3DTShirtStore = create<TShirt3DStoreType>((set) => ({
  decalOpen: false,
  setDecalOpen: (state) =>
    set({ decalOpen:  state}),
}));