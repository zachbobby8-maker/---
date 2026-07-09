/* File Path: components/ArchitectJobBoard.tsx
   Role: Sovereign Architect Work Panel & Mission Dispatch Matrix
   Standard: 100% Build-Safe // Zero External Node Bloat
*/
'use client';
import React, { useState } from 'react';

const coreJobs = [
  { id: 'job-01', index: 'LATTICE_01', role: 'AERO_ACOUSTIC SYSTEM SINTERER', sector: 'PROPULSION_BAY_04', compensation: '9,420 $BRAID', requirement: 'Sintering Silicon Carbide blanking plates for local resonance nullification.' },
  { id: 'job-02', index: 'LATTICE_02', role: 'RUST RUNTIME COMPILER', sector: 'BROWSER_CORE', compensation: '12,000 $BRAID', requirement: 'Compiling non-Chromium string tokenizers to parse incoming mesh data packets.' },
  { id: 'job-03', index: 'LATTICE_03', role: 'LEGENDRIAN TORQUE NODE OPERATOR', sector: 'LEDGER_VAULT', compensation: '14,400 $BRAID', requirement: 'Managing multi-sig wallet handshakes using non-associative geometric rules.' }
];

export default function ArchitectJobBoard() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#010206] border border-[#1c2d5a] p-6 rounded-2xl font-mono text-left flex flex-col gap-4 mt-6">
      <div className="flex justify-between items-center border-b border-[#1c2d5a] pb-3">
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest">// ARCHITECT TASK RECON BOARD</h3>
          <p className="text-[10px] text-[#6b7c96] mt-0.5">ACTIVE MISSIONS LOCKED AT 39,420 HZ</p>
        </div>
        <span className="text-[9px] text-[#5850ec] bg-[#09132e] px-2 py-1 rounded border border-[#1c2d5a] font-bold">STATUS: MESH_ACTIVE</span>
      </div>

      <div className="flex flex-col gap-3">
        {coreJobs.map((job) => (
          <div 
            key={job.id}
            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            className={`border p-4 rounded-xl cursor-pointer transition-all bg-[#02050f] ${
              selectedJob === job.id ? 'border-[#00f2fe] bg-[#09132e]/40' : 'border-[#1c2d5a] hover:border-[#5850ec]'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-[#5850ec] tracking-wider">[{job.index}] // {job.sector}</span>
                <h4 className="text-white font-bold text-xs uppercase tracking-wide">{job.role}</h4>
              </div>
              <div className="text-right flex md:flex-col items-center md:items-end gap-2 md:gap-0">
                <span className="text-[9px] text-[#00f2fe] font-bold bg-[#09132e] px-1.5 py-0.5 rounded border border-[#1c2d5a]">{job.compensation}</span>
              </div>
            </div>

            {selectedJob === job.id && (
              <div className="mt-3 pt-3 border-t border-[#1c2d5a] text-[11px] text-[#9cb3c9] leading-relaxed animate-fadeIn">
                <p className="mb-2"><strong className="text-white">OPERATION CRITERIA:</strong> {job.requirement}</p>
                <div className="w-full text-center border border-[#1c2d5a] bg-[#010206] text-[#00f2fe] font-bold text-[8px] py-1.5 uppercase tracking-widest rounded hover:border-[#00f2fe] transition-all mt-1">
                  Initialize Mission Handshake
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
