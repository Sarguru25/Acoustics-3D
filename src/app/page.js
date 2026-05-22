'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ProductControls from '@/components/ProductControls';
import { SIZES, COLORS } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#f8f9fa]">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  ),
});

export default function Home() {
  const [selectedSizeId, setSelectedSizeId] = useState(SIZES[0].id);
  const [selectedColorId, setSelectedColorId] = useState(COLORS[2].id); // default green

  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen bg-[#f8f9fa] text-gray-900 font-sans overflow-hidden">
      
      {/* 3D Viewer Section (Left Side) */}
      <section className="relative w-full lg:w-[65%] h-[50vh] lg:h-screen order-1 lg:order-1 flex-shrink-0">
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Scene selectedSizeId={selectedSizeId} selectedColorId={selectedColorId} />
        </div>
      </section>

      {/* Product Controls Section (Right Side) */}
      <section className="relative w-full lg:w-[35%] min-h-[50vh] lg:h-screen order-2 lg:order-2 bg-white border-l border-gray-100 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] overflow-y-auto z-10 p-6 lg:p-12">
        <ProductControls
          selectedSizeId={selectedSizeId}
          setSelectedSizeId={setSelectedSizeId}
          selectedColorId={selectedColorId}
          setSelectedColorId={setSelectedColorId}
        />
      </section>
    </main>
  );
}
