"use client"

import { use3DTShirtStore } from "@/hooks/use3DTShirtStore";
import { Leva } from "leva"

const lightTheme = {
  colors: {
    elevation1: '#F3F4F6', // Background
    elevation2: '#ffffff', // Input background
    elevation3: '#e0e0e0', // Folder background
    accent1: '#0066DC',
    highlight1: 'gray',
    highlight2: '#000',
    highlight3: '#000', // Text color
    vivid1: '#ffcc00',
  },
}
const style={
    top: '80px',
    right: '24px',
    left: 'auto',
    bottom: 'auto',
  }
  

export default function LevaPanel() { 
  const decalOpen = use3DTShirtStore((s) => s.decalOpen);

  return  <div style={{ position: 'absolute', top: 85, left: 20, width: 300 ,zIndex: 5}}>
    <Leva hidden={!decalOpen} theme={lightTheme} fill/>
  </div>
} 