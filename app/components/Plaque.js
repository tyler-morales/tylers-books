import React from "react";

export default function Plaque() {
  return (
    <div className="ml-4 relative w-[250px] justify-self-center h-max align-middle bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-orange-400 rounded-md shadow-sm">
      <h3 className="font-black px-2 text-center uppercase font-serif text-yellow-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] tracking-widest">
        Tyler&apos;s Library
      </h3>
      {/* Screws */}
      <div>
        {/* Top-Left Screw */}
        <div className="absolute top-0 left-1 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

        {/* Top-Right Screw */}
        <div className="absolute top-0 right-1 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

        {/* Bottom-Left Screw */}
        <div className="absolute bottom-0 left-1 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

        {/* Bottom-Right Screw */}
        <div className="absolute bottom-0 right-1 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>
      </div>
    </div>
  );
}
