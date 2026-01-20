export type MeshesType = "laces" | "mesh" | "caps" | "inner" | "sole" | "stripes" | "band" | "patch";

export type Sneakers3DStateType = {
  current: MeshesType | null;
  items: Record<MeshesType, string>;
  setCurrent: (mesh: MeshesType | null) => void;
  setColor: (color: string) => void; 
};