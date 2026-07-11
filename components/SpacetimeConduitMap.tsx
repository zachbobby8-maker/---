/* File Path: components/SpacetimeConduitMap.tsx
   Role: Spacetime Conduit Topology Tensor Grid Map
   Parity Standard: 39,420 Hz Coordinate Tracking Grid // 100% Build-Safe
*/
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function SpacetimeConduitMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [conduitFrequency, setConduitFrequency] = useState<number>(1.0);
  const [gridMode, setGridMode] = useState<string>('tensor'); // tensor vs geodesic

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = 500);
    let h = (canvas.height = 200);
    let time = 0;

    const renderConduitMap = () => {
      ctx.fillStyle = '#010206'; ctx.fillRect(0, 0, w, h);
      time += 0.02 * conduitFrequency;

      const linesCount = 20;
      ctx.lineWidth = 0.75;

      // Render non-associative vector mesh lines representing spacetime coordinates
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = gridMode === 'tensor' ? 'rgba(88, 80, 236, 0.25)' : 'rgba(0, 242, 254, 0.3)';

        const yBase = (h / linesCount) * i;
        
        for (let x = 0; x <= w; x += 10) {
          // Compute localized gravitational warp anomalies across the grid
          const dx = x - (w / 2);
          const dy = yBase - (h / 2);
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          // Spatial deformation function based on system frequency variables
          const warpEffect = Math.sin(distance * 0.05 - time) * (40 / (distance * 0.02 + 1));
          const finalY = yBase + (gridMode === 'tensor' ? warpEffect : -warpEffect * 0.5);

          if (x === 0) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        ctx.stroke();
      }

      // Render tracking telemetry text inside the viewport borders
      ctx.fillStyle = '#00f2fe';
      ctx.font = '8px monospace';
      ctx.fillText(`GEODESIC_MAP: SECTION_04_CONDUIT`, 15, 20);
      ctx.fillText(`TENSOR_DENSITY: ${(conduitFrequency * 39.42).toFixed(2)} KHZ`, 15, 30);
      ctx.fillText(`FIELD_METRIC: ${gridMode.toUpperCase()}_COORDINATES`, w - 160, 20);

      animationId = requestAnimationFrame(renderConduitMap);
    };

    renderConduitMap();
    return () => cancelAnimationFrame(animationId);
  }, [conduitFrequency, gridMode]);

  return (
    <div className="w-full bg-[#010206] border border-[#1c2d5a] p-4 rounded-xl font-mono text-left flex flex-col gap-3 mt-4">
      <div className="flex justify-between items-center border-b border-[#1c2d5a] pb-2 text-[10px] font-bold">
        <span className="text-white tracking-widest">// CONDUIT_TOPOLOGY_MAP_v1.0</span>
        <span className="text-[#5850ec]">SYSTEM_GRID: LOCK</span>
      </div>

      <canvas ref={canvasRef} className="w-full bg-[#010206] rounded-lg border border-[#1c2d5a]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] mt-1">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[#6b7c96]">
            <span>CONDUIT OSCILLATION OSC:</span>
            <span className="text-[#00f2fe] font-bold">{conduitFrequency.toFixed(2)}x</span>
          </div>
          <input 
            type="range" min="0.20" max="3.00" step="0.05" value={conduitFrequency}
            onChange={(e) => setConduitFrequency(Number(e.target.value))}
            className="w-full accent-[#00f2fe] bg-[#02050f] border border-[#1c2d5a] h-1 rounded"
          />
        </div>

        <div className="flex gap-2 items-end">
          <button
            onClick={() => setGridMode('tensor')}
            className={`w-full text-center border text-[8px] py-2 font-bold uppercase rounded transition-all ${
              gridMode === 'tensor' ? 'border-[#5850ec] text-white bg-[#09132e]' : 'border-[#1c2d5a] text-[#6b7c96] hover:border-[#5850ec]'
            }`}
          >
            Tensor Matrix
          </button>
          <button
            onClick={() => setGridMode('geodesic')}
            className={`w-full text-center border text-[8px] py-2 font-bold uppercase rounded transition-all ${
              gridMode === 'geodesic' ? 'border-[#00f2fe] text-white bg-[#09132e]' : 'border-[#1c2d5a] text-[#6b7c96] hover:border-[#00f2fe]'
            }`}
          >
            Geodesic Path
          </button>
        </div>
      </div>
    </div>
  );
}
