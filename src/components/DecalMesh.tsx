import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from "three";

const DecalMesh = () => {
    const { nodes } = useGLTF("/3dModels/t_shirt2-transformed.glb") as any;

    const texture = useTexture("/textures/elvis.jpg");
    const texture2 = useTexture("/textures/liberty.png");
    const texture3 = useTexture("/textures/pluto.png");

    const shirtMeshRef = useRef<THREE.Mesh>(null!)

    const { sticker, angle, posY, scale } = useControls({
        posY: {
            min: -1.5,
            max: 3.8,
            value: -0.2,
            step: 0.01
        },
        angle: {
            min: 0,
            max: Math.PI * 2,
            value: 1.3,
            step: 0.01,
        },

        scale: {
            min: 0.5,
            max: 3.0,
            value: 2.68,
            step: 0.01
        },
        sticker: {
            options: {
                'None': null,
                'Elvis': texture,
                'Liberty': texture2,
                'Pluto': texture3
            }
        }
    })

    const xFactor = 2.0;
    const zFactor = 1.2;

    const rotation = useMemo<[number, number, number]>(() => {
        const x = Math.cos(angle) * xFactor;
        const z = Math.sin(angle) * zFactor;
        const rot = Math.atan2(x, z)
        return [0, rot, 0]
    }, [angle])

    const raycaster = useMemo(() => new THREE.Raycaster(), []);

    const rayOrigin = useMemo(() => {
        const x = Math.cos(angle) * xFactor;
        const z = Math.sin(angle) * zFactor;
        return new THREE.Vector3(x, posY, z)
    }, [angle, posY]);

    const [decalTransform, setDecalTransform] = useState<{
        position: [number, number, number];
    } | null>(null);


    useEffect(() => {
        if (!shirtMeshRef.current) return;

        const target = shirtMeshRef.current;
        const direction = rayOrigin.clone().negate().normalize();

        raycaster.set(rayOrigin, direction);
        const hits = raycaster.intersectObject(target, true);

        if (!hits.length) return;

        const hit = hits[0];

        const normal = hit.face!.normal.clone();
        normal.transformDirection(target.matrixWorld);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

        setDecalTransform({
            position: hit.point.toArray() as [number, number, number],
        });
    }, [rayOrigin, raycaster]);

    return (
        <mesh ref={shirtMeshRef} geometry={nodes['basic_women_oversized_t-shirt001_2'].geometry} >

            <meshStandardMaterial transparent opacity={0} />
            {sticker && <Decal
                // debug
                position={decalTransform?.position ?? [0, 0, 0]}
                rotation={rotation}
                scale={[scale, scale, scale]}
            >
                <meshStandardMaterial
                    map={sticker}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-1}
                />
            </Decal>}
        </mesh>
    );
};

export default DecalMesh;