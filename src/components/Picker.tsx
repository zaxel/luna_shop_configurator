"use client"
import { use3DSneakersStore } from "@/hooks/use3DSneakersStore";
import { HexColorPicker } from "react-colorful";

function Picker() {
  const { current, items, setColor } = use3DSneakersStore();
  const color = current ? items[current] : "#cccccc";
  return (
    <div>
      <div className="mb-8 flex gap-4 items-center">
        <h4 className="font-medium">Current mesh:</h4>
        <div className="text-xl font-medium">{current ? current : "not picked (pick on shoe)"}</div>
      </div>
      <div className="flex gap-4">
        <h4 className="font-medium mb-4">Pick a color: </h4>
        <div className="h-28">
          <HexColorPicker className="max-h-full" color={color} onChange={setColor} />
        </div>
      </div>
    </div>
  )
}

export default Picker;