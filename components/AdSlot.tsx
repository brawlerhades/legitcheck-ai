"use client";

import React from "react";

type AdSlotProps = {
  label?: string;
  className?: string;
  height?: number;
};

export default function AdSlot({
  label = "Ad",
  className = "",
  height = 600,
}: AdSlotProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5",
        "backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
        "flex items-center justify-center text-white/40",
        className,
      ].join(" ")}
      style={{ height }}
    >
      <div className="text-center px-4">
        <div className="text-sm uppercase tracking-widest">{label}</div>
        <div className="text-xs mt-2 opacity-70">
          Replace with Google AdSense unit
        </div>
      </div>
    </div>
  );
}
