'use client';
import { RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { SIZES, COLORS } from '@/lib/constants';

export default function AcousticPanel({
selectedSizeId,
selectedColorId,
}) {
const meshRef = useRef();

// ================================
// FIND SELECTED OPTIONS
// ================================

const selectedColor =
COLORS.find((c) => c.id === selectedColorId) ||
COLORS[0];

const targetSize = useMemo(() => {
return (
SIZES.find((s) => s.id === selectedSizeId)
?.dimensions || [1, 1, 0.2]
);
}, [selectedSizeId]);

// ================================
// LOAD TEXTURE
// ================================

const texture = useLoader(
THREE.TextureLoader,
selectedColor.texture
);

// ================================
// TEXTURE SETTINGS
// ================================

useMemo(() => {
if (!texture) return;


// Better texture quality
texture.colorSpace = THREE.SRGBColorSpace;

// Prevent stretching
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Repeat texture evenly
texture.repeat.set(1, 1);

// Improve sharpness
texture.anisotropy = 16;

// Update texture
texture.needsUpdate = true;


}, [texture]);

// ================================
// SMOOTH SCALE ANIMATION
// ================================

useFrame((state, delta) => {
if (!meshRef.current) return;


const speed = 6;

meshRef.current.scale.x =
  THREE.MathUtils.damp(
    meshRef.current.scale.x,
    targetSize[0],
    speed,
    delta
  );

meshRef.current.scale.y =
  THREE.MathUtils.damp(
    meshRef.current.scale.y,
    targetSize[1],
    speed,
    delta
  );

meshRef.current.scale.z =
  THREE.MathUtils.damp(
    meshRef.current.scale.z,
    targetSize[2],
    speed,
    delta
  );

// Optional subtle floating rotation
meshRef.current.rotation.y += delta * 0.15;


});

// ================================
// RENDER
// ================================

return ( <mesh
   ref={meshRef}
   castShadow
   receiveShadow
 >
{/* Cube Geometry */}
<RoundedBox
  args={[1, 1, 1]}
  radius={0.018}
  smoothness={60}
>
  <meshStandardMaterial
    map={texture}
    roughness={0.9}
    metalness={0.05}
  />
</RoundedBox>
</mesh>


);
}
