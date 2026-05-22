'use client';

import { motion } from 'framer-motion';
import { SIZES, COLORS } from '@/lib/constants';
import { ShoppingCart, Info, ShieldCheck, Truck } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ProductControls({
  selectedSizeId,
  setSelectedSizeId,
  selectedColorId,
  setSelectedColorId,
}) {
  return (
    <div className="w-full h-full flex flex-col justify-start max-w-md mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
          Classic Acoustic Panels
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Experience uncompromising sound clarity with our premium aesthetic acoustic treatment. Designed for luxury spaces.
        </p>
      </div>

      {/* Shape Selector */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900">Shape: <span className="font-normal text-slate-600">{SIZES.find(s => s.id === selectedSizeId)?.label}</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSizeId(size.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ease-out",
                selectedSizeId === size.id 
                  ? "border-slate-900 bg-slate-50 shadow-sm" 
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <span className="font-semibold text-sm text-slate-900 mb-1">{size.label}</span>
              <span className="text-xs text-slate-500 whitespace-nowrap">{size.description}</span>
              {selectedSizeId === size.id && (
                <motion.div 
                  layoutId="active-size"
                  className="absolute inset-0 border-2 border-slate-900 rounded-xl pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="mb-12">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Fabric Color: <span className="font-normal text-slate-600">{COLORS.find(c => c.id === selectedColorId)?.label}</span></h2>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColorId(color.id)}
              className={cn(
                "relative w-10 h-10 rounded-lg overflow-hidden transition-all duration-300",
                selectedColorId === color.id ? "ring-2 ring-offset-2 ring-slate-900 scale-110" : "ring-1 ring-gray-200 hover:ring-gray-400 hover:scale-105"
              )}
              title={color.label}
            >
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Price & Cart */}
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Total Price</p>
            <p className="text-3xl font-bold text-slate-900">$59.00</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 active:scale-[0.98] shadow-lg shadow-slate-900/20">
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </button>
      </div>

      {/* Benefits */}
      <div className="mt-8 bg-blue-50/50 rounded-xl p-5 border border-blue-100">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900/80 leading-relaxed">
            Not sure which product fits your room? Get a free consultation with our acoustic experts — complete with personalized guidance and a custom room plan.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 pb-8">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>5 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Truck className="w-4 h-4 text-slate-400" />
          <span>Global Shipping</span>
        </div>
      </div>
    </div>
  );
}
