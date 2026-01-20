"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { use3DSneakersStore } from "@/hooks/use3DSneakersStore";
import { MeshesType } from "@/const/types";

function Shoe(props: React.ComponentProps<"group">) {
  const { nodes, materials } = useGLTF("/3dModels/shoe-transformed.glb") as any;

  const { current, items, setColor, setCurrent } = use3DSneakersStore();
  const [hovered, setHovered] = useState<MeshesType | null>(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered])


  return (
    <group
      {...props} dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation();
        const key = e.object.userData.meshKey as MeshesType | undefined;
        if (key) setHovered(key);
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) {
          setHovered(null);
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (!hovered) return;
        setCurrent(hovered);
      }}
      onPointerMissed={(e) => {
        setCurrent(null);
      }}
      scale={[2, 2, 2]}
      rotation={[0, -Math.PI / 6, -Math.PI / 10]}
    >

      <mesh userData={{ meshKey: "band" }} geometry={nodes.shoe_3.geometry}>
        <meshStandardMaterial color={items.band} />
      </mesh>

      <mesh userData={{ meshKey: "sole" }} geometry={nodes.shoe_1.geometry}>
        <meshStandardMaterial color={items.sole} />
      </mesh>

      <mesh userData={{ meshKey: "caps" }} geometry={nodes.shoe_4.geometry}>
        <meshStandardMaterial color={items.caps} />
      </mesh>

      <mesh userData={{ meshKey: "mesh" }} geometry={nodes.shoe.geometry}>
        <meshStandardMaterial color={items.mesh} />
      </mesh>

      <mesh userData={{ meshKey: "patch" }} geometry={nodes.shoe_5.geometry}>
        <meshStandardMaterial color={items.patch} />
      </mesh>

      <mesh userData={{ meshKey: "inner" }} geometry={nodes.shoe_6.geometry}>
        <meshStandardMaterial color={items.inner} />
      </mesh>

      <mesh userData={{ meshKey: "stripes" }} geometry={nodes.shoe_2.geometry}>
        <meshStandardMaterial color={items.stripes} />
      </mesh>

      <mesh userData={{ meshKey: "laces" }} geometry={nodes.shoe_7.geometry}>
        <meshStandardMaterial color={items.laces} />
      </mesh>

    </group>
  );
}

export default function Trainers3dModelScene() {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <OrbitControls />
      <Environment preset="city" />
      <Suspense fallback={<Html center>
        <div className="text-2xl text-gray-500">
          Loading…
        </div>
      </Html>}>
        <Float >
          <Shoe />
        </Float>
        <ContactShadows position-y={-1.6} opacity={0.4} blur={2} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/3dModels/shoe-transformed.glb");
