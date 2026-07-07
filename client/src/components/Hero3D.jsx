import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero3D() {
  const containerRef = useRef();
  const tiltRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 12; // deg
      const rotateX = -y * 10; // deg
      tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function onLeave() {
      tilt.style.transform = '';
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="tilt-container relative hero-grid" style={{minWidth:420}}>
      <div ref={tiltRef} className="tilt">
        <div className="relative flex items-center justify-center">
          <div className="absolute -right-16 -top-8 z-10">
            <div className="dashed-ring w-80 h-80 rounded-full" />
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass hero-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate/70">Spine & Posture Analysis</p>
                <p className="mt-1 text-lg font-semibold">Dr. Sana Qureshi, DPT</p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs">Active</div>
            </div>

            <div className="mt-6 space-y-4">
              {['Mobility','Strength','Pain Level'].map((label, i) => (
                <div key={label}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-sm text-slate/60">{[82,67,74][i]}%</span>
                  </div>
                  <div className="bg-white/10 rounded-full mt-2">
                    <div style={{ width: `${[82,67,74][i]}%` }} className={`progress ${i===2? 'bg-teal':'bg-coral'}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-teal/80" />
              <div className="text-xs text-slate/70">3 specialists on case</div>
            </div>
          </motion.div>

          <div className="absolute right-6 top-24 grid gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white p-3 shadow-soft float-1">💀</div>
            <div className="w-12 h-12 rounded-2xl bg-white p-3 shadow-soft float-2">🏅</div>
            <div className="w-12 h-12 rounded-2xl bg-white p-3 shadow-soft float-3">✨</div>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-6">
        <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-teal animate-pulse" /> Now accepting new patients in Islamabad
        </div>
      </div>
    </div>
  );
}
