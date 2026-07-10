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
    <div ref={containerRef} className="tilt-container relative hero-grid w-full max-w-[480px] px-4 py-6">
      <div ref={tiltRef} className="tilt">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="dashed-ring h-[22rem] w-[22rem] opacity-[0.22]" />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass hero-card relative z-10 w-full max-w-[420px] rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(31,42,48,0.10)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate/70">Treatment snapshot</p>
                <p className="mt-2 text-lg font-semibold text-slate">Spine & Posture Analysis</p>
                <p className="mt-2 text-sm leading-6 text-slate/70">Personalized movement and pain assessment with a calm, evidence-led plan.</p>
              </div>
              <div className="rounded-full border border-teal/15 bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Active</div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { label: 'Mobility', value: 82, tone: '#008C8A' },
                { label: 'Strength', value: 67, tone: '#FF6F61' },
                { label: 'Pain Level', value: 74, tone: '#008C8A' }
              ].map((item) => (
                <div key={item.label} className="rounded-[16px] border border-slate/5 bg-white/80 p-3">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate">
                    <span>{item.label}</span>
                    <span className="font-semibold text-slate/70">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-mist">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.tone }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate/10 pt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate">3 specialists on case</p>
                  <p className="mt-1 text-sm text-slate/60">Guided support from assessment to recovery</p>
                </div>
                <div className="rounded-full bg-mist px-3 py-2 text-sm font-semibold text-slate">Progress</div>
              </div>
            </div>

            <div className="mt-5 rounded-[16px] border border-teal/10 bg-teal/5 px-4 py-3 text-sm text-slate/70">
              <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
              Now accepting new patients in Islamabad
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
