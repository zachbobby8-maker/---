/* File Path: components/AeroAcousticWeaver.tsx
   Role: Aero Acoustic Waveform Interpolation & Sonic Flow Matrix
   Parity Standard: 39,420 Hz Phase-Locked Frequency Tracking
*/
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function AeroAcousticWeaver() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [machSpeed, setMachSpeed] = useState<number>(0.84);
  const [weaverFrequency, setWeaverFrequency] = useState<number>(39420);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = 500);
    let h = (canvas.height = 240);

    let time = 0;
    const lineCount = 8;

    const renderWeave = () => {
      ctx.fillStyle = '#02050f'; ctx.fillRect(0, 0, w, h);
      time += 0.02 * (machSpeed + 0.2);

      // Render structural acoustic boundaries
      ctx.strokeStyle = 'rgba(28, 45, 90, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(40, h / 2); ctx.lineTo(w - 40, h / 2);
      ctx.stroke();

      // Weave the intertwined aeroacoustic flow strands
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        
        // Offset each wave strand to create the braided braid geometry
        const offset = (i * Math.PI) / lineCount;
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(88, 80, 236, 0.4)';
        ctx.lineWidth = i === 2 || i === 5 ? 1.5 : 0.75;

        for (let x = 40; x < w - 40; x += 2) {
          // Calculate the fluidic compression envelope
          const envelope = Math.sin((x - 40) / (w - 80) * Math.PI);
          
          // Aeroacoustic pressure oscillation equation
          const frequencyFactor = (weaverFrequency / 39420) * 0.05;
          const sineWave = Math.sin(x * frequencyFactor - time + offset);
          const cosineWave = Math.cos(x * 0.02 + time - offset * 2);
          
          const y = (h / 2) + (sineWave * cosineWave * 45 * envelope * machSpeed);

          if (x === 40) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // Render high-intensity node points at the intersections
          if (Math.abs(y - h / 2) < 0.5 && x % 20 === 0) {
            ctx.fillStyle = '#00f2fe';
            ctx.fillRect(x - 1, h / 2 - 1, 2, 2);
          }
        }
        ctx.stroke();
      }

      // Live visual status text overlay
      ctx.fillStyle = '#00f2fe';
      ctx.font = '9px monospace';
      ctx.fillText(`AIRFLOW_VELOCITY: MACH ${machSpeed.toFixed(2)}`, 15, 20);
      ctx.fillText(`RESONANCE_FREQUENCY: ${weaverFrequency.toLocaleString()} HZ`, 15, 32);

      animationId = requestAnimationFrame(renderWeave);
    };

    renderWeave();
    return () => cancelAnimationFrame(animationId);
  }, [machSpeed, weaverFrequency]);

  return (
    <div className="w-full bg-[#010206] border border-[#1c2d5a] p-4 rounded-xl font-mono text-left flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-[#1c2d5a] pb-2 text-[10px] font-bold">
        <span className="text-white tracking-widest">// AERO_ACOUSTIC_WEAVER_CORE</span>
        <span className="text-[#00f2fe] animate-pulse">● HARMONIC_FLOW_LIVE</span>
      </div>

      <canvas ref={canvasRef} className="w-full bg-[#02050f] rounded-lg border border-[#1c2d5a]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] mt-1">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[#6b7c96]">
            <span>FLOW COMPRESSION RATIO:</span>
            <span className="text-[#00f2fe] font-bold">{(machSpeed * 100).toFixed(0)}%</span>
          </div>
          <input 
            type="range" min="0.20" max="1.50" step="0.01" value={machSpeed}
            onChange={(e) => setMachSpeed(Number(e.target.value))}
            className="w-full accent-[#00f2fe] bg-[#02050f] border border-[#1c2d5a] h-1 rounded"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[#6b7c96]">
            <span>WEAVER FREQUENCY:</span>
            <span className="text-[#5850ec] font-bold">{weaverFrequency} HZ</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setWeaverFrequency(39420)}
              className="w-full border border-[#1c2d5a] bg-[#02050f] text-white text-[8px] py-1 font-bold rounded hover:border-[#00f2fe]"
            >
              Lock 39.42kHz
            </button>
            <button
              onClick={() => setWeaverFrequency(14200)}
              className="w-full border border-[#1c2d5a] bg-[#02050f] text-white text-[8px] py-1 font-bold rounded hover:border-[#ef4444]"
            >
              Drop to 14.2kHz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
