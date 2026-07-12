import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const cardStats = [
  { label: 'Mobility', value: 82, tone: '#008C8A' },
  { label: 'Strength', value: 67, tone: '#FF6F61' },
  { label: 'Pain Level', value: 74, tone: '#008C8A' }
];

function BoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M8.5 5.5C6.6 5.5 5 7.1 5 9c0 1.6 1.1 2.9 2.6 3.4.7.2 1.2.8 1.2 1.6v2.2a2 2 0 0 0 2 2H11a2 2 0 0 0 2-2v-2.2c0-.8.5-1.4 1.2-1.6 1.5-.5 2.6-1.8 2.6-3.4 0-1.9-1.6-3.5-3.5-3.5" />
      <path d="M8 9.5h8" />
      <path d="M9.5 13h5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M12 20s-6.6-4.1-8.3-7.2a4.7 4.7 0 0 1 7.3-5.8 4.7 4.7 0 0 1 7.3 5.8C18.6 15.9 12 20 12 20Z" />
    </svg>
  );
}

function StethoscopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M9 4v6a3 3 0 0 0 6 0V4" />
      <path d="M7 10a5 5 0 0 0 10 0" />
      <path d="M12 16v3" />
      <path d="M12 19a2 2 0 0 0 2 2h1" />
      <path d="M9 19a2 2 0 0 1 2-2h1" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M12 3 13.7 8.3 19 10 13.7 11.7 12 17 10.3 11.7 5 10 10.3 8.3 12 3Z" />
      <path d="M19 15.5 19.8 18 22 18.8 19.8 19.7 19 22 18.1 19.7 15.9 18.8 18.1 18 19 15.5Z" />
    </svg>
  );
}

function RatingBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-[11px] font-semibold text-slate shadow-[0_10px_26px_rgba(31,42,48,0.10)] backdrop-blur-md">
      <span className="text-[10px] tracking-[0.24em] text-[#FF6F61]">★★★★★</span>
      <span className="whitespace-nowrap">Life-changing care!</span>
    </div>
  );
}

const floatingIcons = [
  { type: 'bone', label: 'Bone', className: 'hidden lg:flex -left-4 top-6', initial: { y: 0, x: 0 }, animate: { y: [0, -8, 0], rotate: [0, -4, 0] } },
  { type: 'heart', label: 'Heart', className: 'hidden lg:flex -right-4 bottom-4', initial: { y: 0, x: 0 }, animate: { y: [0, 10, 0], rotate: [0, 4, 0] } },
  { type: 'stethoscope', label: 'Stethoscope', className: 'hidden lg:flex -left-4 bottom-20', initial: { y: 0, x: 0 }, animate: { y: [0, -10, 0], rotate: [0, 2, 0] } },
  { type: 'rating', label: 'Rating', className: 'hidden lg:flex right-2 -top-2', initial: { y: 0, x: 0 }, animate: { y: [0, 8, 0], rotate: [0, -3, 0] } },
  { type: 'sparkle', label: 'Sparkles', className: 'hidden lg:flex right-0 top-28', initial: { y: 0, x: 0 }, animate: { y: [0, -12, 0], rotate: [0, 2.5, 0] } }
];

function FloatingSceneIcon({ type, className, index }) {
  const iconMap = {
    bone: <BoneIcon />,
    heart: <HeartIcon />,
    stethoscope: <StethoscopeIcon />,
    rating: <RatingBadge />,
    sparkle: <SparkleIcon />
  };

  const isRating = type === 'rating';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: [0, -8, 0], rotate: [0, -3, 0] }}
      transition={{ delay: index * 0.08, duration: 3.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      className={`absolute ${className} z-20 pointer-events-none flex items-center justify-center rounded-[18px] border border-white/70 bg-white/85 text-teal shadow-[0_10px_26px_rgba(31,42,48,0.10)] backdrop-blur-md ${isRating ? 'h-auto w-auto rounded-full px-3 py-2' : 'h-16 w-16'}`}
    >
      {iconMap[type]}
    </motion.div>
  );
}

export default function Hero3D() {
  const containerRef = useRef();
  const tiltRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 12;
      const rotateX = -y * 10;
      tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function onLeave() {
      tilt.style.transform = '';
    }

    function onScroll() {
      setScrollY(window.scrollY);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="tilt-container relative hero-grid w-full max-w-[640px] overflow-visible px-3 py-8 sm:px-4 lg:max-w-[700px]">
      <motion.div
        className="absolute left-6 top-8 h-24 w-24 rounded-full bg-[rgba(0,140,138,0.16)] blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <motion.div
        className="absolute right-2 top-16 h-32 w-32 rounded-full bg-[rgba(255,111,97,0.16)] blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />

      <div ref={tiltRef} className="tilt relative flex items-center justify-center pt-2 pb-1">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="dashed-ring h-[22rem] w-[22rem] opacity-[0.22] lg:h-[24rem] lg:w-[24rem]" />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass hero-card relative z-10 w-full max-w-[380px] rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(31,42,48,0.10)] backdrop-blur-xl"
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
            {cardStats.map((item) => (
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
            Guided support from assessment to recovery
          </div>
        </motion.div>

        {floatingIcons.map((item, index) => (
          <FloatingSceneIcon key={item.label} type={item.type} className={item.className} index={index} />
        ))}
      </div>
    </div>
  );
}
