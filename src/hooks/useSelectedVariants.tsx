import { products } from "@wix/stores";
import { create } from "zustand";

type SelectedVariantStore = {
  selectedVariant?: products.Variant;
  setSelectedVariant: (variant?: products.Variant) => void;
};

export const useSelectedVariantStore = create<SelectedVariantStore>((set) => ({
  selectedVariant: undefined,
  setSelectedVariant: (variant) =>
    set({ selectedVariant: variant }),
}));