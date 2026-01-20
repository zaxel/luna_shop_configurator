"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Decal, Environment, Float, Html, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";


function TShirt(props: React.ComponentProps<"group">) {

  const texture = useTexture("/textures/elvis.jpg");
  const { nodes, materials } = useGLTF("/3dModels/swish_ready.glb") as any;
  const shirtRef = useRef<THREE.Mesh>(null!)

  return (
    <group 
      scale={1.6} 
      {...props} 
      dispose={null}
      rotation={[0, -Math.PI / 6, 0]}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.DESIGN} >
        <meshStandardMaterial color={"gray"}/>


        <Decal
          // debug
          mesh={shirtRef}
          position={[0, 0, 0.5]}
          rotation={[0, degToRad(0), 0]}
          scale={0.4}
        >
          <meshStandardMaterial
            map={texture}
            // transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
    </group>

  );
}

export default function TShirt3DModelSceneReady() {
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
