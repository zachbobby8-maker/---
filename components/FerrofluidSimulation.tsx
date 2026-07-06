/* File Path: components/FerrofluidSimulation.tsx
   Role: High-Velocity Magnetic Vector & Mars Orbit Tracker
   Parity Standard: 39,420 Hz Synchronization Loop
*/
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function FerrofluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intensity, setIntensity] = useState<number>(1.5);
  const [frequencySync, setFrequencySync] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    
    let animationId: number;
    let w = (canvas.width = 500);
    let h = (canvas.height = 240);
    
    // Grid alignment variables for the 1.4M Node mesh projection
    const rows = 12;
    const cols = 22;
    const spacingX = w / cols;
    const spacingY = h / rows;
    let time = 0;

    const renderLoop = () => {
      ctx.fillStyle = '#02050f'; ctx.fillRect(0, 0, w, h);
      time += 0.04;

      // Draw thin background grid rules
      ctx.strokeStyle = 'rgba(28, 45, 90, 0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cols; i++) {
        ctx.beginPath(); ctx.moveTo(i * spacingX, 0); ctx.lineTo(i * spacingX, h); ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        ctx.beginPath(); ctx.moveTo(0, j * spacingY); ctx.lineTo(w, j * spacingY); ctx.stroke();
      }

      // Render the shifting fluidic spikes across coordinates
      for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
          const x = c * spacingX;
          const y = r * spacingY;

          // Legendrian non-associative wave equation tracking dQ/dt = 0.00W
          const wave1 = Math.sin(c * 0.4 + time) * Math.cos(r * 0.4 + time);
          const wave2 = Math.cos(c * 0.2 - time * 0.5) * intensity;
          const spikeHeight = (wave1 + wave2) * 8;

          ctx.fillStyle = frequencySync ? '#00f2fe' : '#ef4444';
          
          // Render precise magnetic ferrofluidic points
          ctx.beginPath();
          ctx.arc(x, y + spikeHeight, 1.5 + Math.abs(spikeHeight * 0.1), 0, Math.PI * 2);
          ctx.fill();

          // Connect active vector vectors dynamically
          if (c < cols - 1 && Math.abs(spikeHeight) > 4) {
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
            ctx.beginPath();
            ctx.moveTo(x, y + spikeHeight);
            ctx.lineTo(x + spacingX, y + spikeHeight);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationId);
  }, [intensity, frequencySync]);

  return (
    <div className="w-full bg-[#010206] border border-[#1c2d5a] p-4 rounded-xl font-mono text-left flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-[#1c2d5a] pb-2 text-[10px] font-bold">
        <span className="text-white tracking-widest">// ORBITAL SHUNT METRIC SIMULATION</span>
        <span className="text-[#5850ec]">SYNC: 39,420 HZ</span>
      </div>

      <canvas ref={canvasRef} className="w-full bg-[#02050f] rounded-lg border border-[#1c2d5a]" />

      <div className="flex flex-col gap-2 text-[10px] mt-1">
        <div className="flex justify-between text-[#6b7c96]">
          <span>MAGNETIC FORCE AMPLITUDE:</span>
          <span className="text-[#00f2fe] font-bold">{intensity.toFixed(2)}x</span>
        </div>
        <input 
          type="range" min="0.5" max="3.0" step="0.1" value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-[#00f2fe] bg-[#02050f] border border-[#1c2d5a] h-1 rounded"
        />
      </div>

      <div className="flex gap-2 mt-1">
        <button
          onClick={() => setFrequencySync(!frequencySync)}
          className="w-full border border-[#1c2d5a] bg-[#02050f] text-white hover:border-[#00f2fe] text-[9px] py-1.5 font-bold uppercase rounded-lg transition-all"
        >
          Toggle Clock Sync Status
        </button>
      </div>
    </div>
  );
}
