"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { useSelectedVariantStore } from "@/hooks/useSelectedVariants";
import { colorMap } from "@/const/colorMap";
import DecalMesh from "./DecalMesh";


function TShirt(props: React.ComponentProps<"group">) {
  const { nodes, materials } = useGLTF("/3dModels/t_shirt2-transformed.glb") as any;

  const selectedVariant = useSelectedVariantStore( 
    (state) => state.selectedVariant
  );

  return (
    <group
      scale={0.9}
      {...props}
      dispose={null}
      rotation={[0, -Math.PI / 6, 0]}>
      <mesh geometry={nodes['basic_women_oversized_t-shirt001_1'].geometry} material={materials['basic white']} >
        <meshStandardMaterial color={colorMap[selectedVariant?.choices?.Color ?? "white"]} />
      </mesh>
      <DecalMesh />
    </group >
  );
}

export default function TShirt3DModelScene() {
  return (
    <div className="h-[85dvh]">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <OrbitControls />
        <Environment preset="city" />
        <Suspense fallback={<Html center>
          <div className="text-2xl text-gray-500">
            Loading…
          </div>
        </Html>}>
          <Float >
            <TShirt />
          </Float>
          <ContactShadows position-y={-2.2} opacity={0.4} blur={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
