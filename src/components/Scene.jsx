'use client';

import { useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import AcousticPanel from './AcousticPanel';

// Helps prevent WebGL Context Lost errors during Next.js HMR
function WebGLCleanup() {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    return () => {
      if (gl) {
        const extension = gl.getExtension('WEBGL_lose_context');
        if (extension) extension.loseContext();
        gl.dispose();
      }
    };
  }, [gl]);
  return null;
}

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('THREE.Clock: This module has been deprecated')) return;
    originalWarn(...args);
  };
}

export default function Scene({ selectedSizeId, selectedColorId }) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      camera={{ position: [2.5, 1.5, 3.5], fov: 40 }}
    >
      <WebGLCleanup />
      
      {/* Soft Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#e0eaff" />
      
      <Suspense fallback={null}>
        <group position={[0, -0.2, 0]}>
          <AcousticPanel selectedSizeId={selectedSizeId} selectedColorId={selectedColorId} />
          
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.4} 
            scale={5} 
            blur={2} 
            far={2} 
          />
        </group>
        <Environment preset="city" opacity={0.2} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={6}
      />
    </Canvas>
  );
}
