import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';

/* ─── Animated Counter Hook ─── */
function useCountUp(target, duration = 2000, startOnMount = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const startCount = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, hasStarted]);

  useEffect(() => {
    if (!startOnMount) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCount();
      },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [startCount, startOnMount]);

  return { count, ref };
}

function AnimatedStat({ target, suffix = '', label, valueColor = 'text-teal', labelColor = 'text-slate/60' }) {
  const { count, ref } = useCountUp(target, 2200);
  return (
    <div ref={ref} className="hero-stat flex flex-col items-center text-center">
      <p className={`text-[2rem] font-bold leading-none sm:text-[2.4rem] ${valueColor}`}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className={`mt-1 text-sm ${labelColor}`}>{label}</p>
    </div>
  );
}

const services = [
  {
    slug: 'back-pain-therapy',
    title: 'Back Pain Therapy',
    icon: 'spine',
    tag: 'Pain relief',
    tagClass: 'bg-teal/10 text-teal',
    meta: ['6–8 sessions', 'Insurance accepted', 'Home plan'],
    excerpt: 'Gentle treatment for tension, disc-related pain, posture issues, and movement restriction.',
    description: 'A calming, guided approach that combines manual therapy, mobility work, and strength programming for long-term relief.',
    benefits: ['Reduce pain and stiffness', 'Improve posture and movement quality', 'Build confidence returning to activity'],
    whoFor: 'Ideal for desk workers, weekend runners, and anyone easing back pain after a flare-up.',
    faq: [
      { question: 'How long is a session?', answer: 'Initial consultations usually last about 60 minutes, while follow-ups are around 45 minutes.' },
      { question: 'Do you offer home visits?', answer: 'Yes, home visits are available for patients who prefer treatment in a familiar setting.' },
      { question: 'What should I bring?', answer: 'Comfortable clothing and any recent imaging or notes you have are helpful.' }
    ]
  },
  {
    slug: 'knee-rehab',
    title: 'Knee Rehab',
    icon: 'knee',
    tag: 'Joint recovery',
    tagClass: 'bg-[#eef8f7] text-slate',
    meta: ['Progressive rehab', 'Sport return', 'Guided strength'],
    excerpt: 'Rehab support for ACL, meniscus, and post-injury recovery with return-to-sport planning.',
    description: 'Structured therapy that restores confidence, stability, and strength after injury or surgery.',
    benefits: ['Rebuild strength and endurance', 'Reduce swelling and improve control', 'Support safe return to sport and daily activity'],
    whoFor: 'Great for active adults, athletes, and post-op patients rebuilding knee function.',
    faq: [
      { question: 'Can this help after surgery?', answer: 'Yes, we work closely with patients recovering from ligament or meniscal procedures.' },
      { question: 'How soon can I return to sport?', answer: 'That depends on your progress, but we create phased plans for a safe return.' },
      { question: 'Do you see children?', answer: 'We welcome adolescent patients and tailor treatment based on development and goals.' }
    ]
  },
  {
    slug: 'shoulder-and-rotator-cuff',
    title: 'Shoulder & Rotator Cuff Rehab',
    icon: 'shoulder',
    tag: 'Mobility care',
    tagClass: 'bg-[#fff3ef] text-[#FF6F61]',
    meta: ['Shoulder mobility', 'Desk-friendly', 'Recovery pacing'],
    excerpt: 'Support for shoulder impingement, cuff strain, and movement restrictions that affect work and sleep.',
    description: 'Thoughtful rehabilitation that blends manual care, movement retraining, and progressive loading.',
    benefits: ['Ease pain during overhead activity', 'Improve range of motion and control', 'Prevent recurring strain'],
    whoFor: 'Helpful for desk workers, lifters, and people managing recurrent shoulder discomfort.',
    faq: [
      { question: 'Is this only for athletes?', answer: 'No, many patients come in for desk posture issues, lifting strain, or age-related shoulder wear.' },
      { question: 'How long does recovery take?', answer: 'It depends on the level of irritation, but improvement is often noticeable within a few visits.' },
      { question: 'Can I continue working?', answer: 'Yes, we often adjust daily habits and movement patterns so you can stay active while healing.' }
    ]
  }
];

const conditions = [
  {
    slug: 'back-pain',
    title: 'Back Pain',
    summary: 'From posture-related tension to more persistent pain patterns, we create a plan that eases discomfort and builds resilience.',
    symptoms: ['Pain after long sitting or standing', 'Reduced flexibility or stiffness', 'Awkward movement patterns'],
    causes: ['Poor posture', 'Weak core strength', 'Repetitive lifting or prolonged inactivity'],
    tips: ['Take gentle walks', 'Avoid prolonged static positions', 'Use supportive ergonomics'],
    whenToSee: 'Book sooner if the pain is worsening, radiating, or limiting daily movement.'
  },
  {
    slug: 'sports-injuries',
    title: 'Sports Injuries',
    summary: 'We support return-to-play goals with a careful, progressive approach that prioritizes safe recovery.',
    symptoms: ['Localised swelling or tenderness', 'Reduced range of motion', 'Fear of reinjury'],
    causes: ['Overuse', 'Sudden movement changes', 'Insufficient warm-up or recovery'],
    tips: ['Rest the affected area briefly', 'Use ice and compression if advised', 'Keep moving gently if comfortable'],
    whenToSee: 'Seek care if pain continues beyond a few days or affects gait or strength.'
  },
  {
    slug: 'post-op-recovery',
    title: 'Post-Op Recovery',
    summary: 'Our post-surgical rehab plans focus on comfort, mobility, and confidence as you regain independence.',
    symptoms: ['Reduced strength', 'Scar tissue stiffness', 'Anxiety around movement'],
    causes: ['Surgery-related immobility', 'Scar tightness', 'Reduced conditioning'],
    tips: ['Follow your surgical precautions', 'Keep mobility gentle and regular', 'Stay hydrated and rested'],
    whenToSee: 'Contact us after your surgeon’s guidance is clear and you are ready to progress.'
  }
];

const team = [
  {
    slug: 'dr-sana-qureshi',
    name: 'Dr. Sana Qureshi',
    title: 'DPT • Orthopaedic & Sports Rehab',
    bio: 'Dr. Sana specialises in movement assessment, return-to-sport planning, and helping patients regain confidence after injury.',
    credentials: ['DPT', '10+ years in orthopaedic and sports rehab', 'Trusted by runners, active adults, and post-op patients'],
    specialties: ['Sports injury return-to-play', 'Post-op recovery', 'Posture and mobility correction']
  },
  {
    slug: 'ali-raza',
    name: 'Ali Raza',
    title: 'Physiotherapist • Knee & Sport Recovery',
    bio: 'Ali focuses on knee rehabilitation, progressive loading, and hands-on care that makes recovery feel manageable.',
    credentials: ['Physiotherapist', 'Knee rehabilitation specialist', 'Strength and movement programming'],
    specialties: ['ACL and meniscus rehab', 'Return to sport', 'Strength-based recovery']
  },
  {
    slug: 'zoya-khan',
    name: 'Zoya Khan',
    title: 'Physiotherapist • Women’s Health & Post-Op',
    bio: 'Zoya supports women through post-surgical recovery, pelvic health, and movement retraining with a calm, practical approach.',
    credentials: ['Women’s health PT', 'Post-op support', 'Evidence-led care plans'],
    specialties: ['Women’s health physio', 'Post-op rehab', 'Pain relief and mobility']
  }
];

const testimonials = [
  {
    name: 'Hamza K.',
    quote: 'I ran 10k again after just six weeks of guided rehab. The team made the process feel calm and clear.',
    treatment: 'Knee rehab and strength progression',
    rating: 5
  },
  {
    name: 'Rabia A.',
    quote: 'My shoulder pain eased quickly and I was back at work without the constant ache.',
    treatment: 'Shoulder and rotator cuff rehab',
    rating: 5
  },
  {
    name: 'Adeel S.',
    quote: 'Professional, caring, and genuinely thoughtful. Every appointment felt purposeful.',
    treatment: 'Post-op recovery and mobility work',
    rating: 5
  }
];

const articles = [
  {
    slug: 'why-good-posture-matters',
    title: 'Why good posture matters for recovery',
    category: 'Tips',
    categoryClass: 'bg-teal text-white',
    readingTime: '4 min read',
    date: 'Jul 2, 2026',
    imageClass: 'from-[#e7f4f3] via-[#f7fbfb] to-[#dfeeea]',
    imageSrc: '/articles/posture.svg',
    excerpt: 'Small posture shifts can make a big difference when pain is linked to long hours at a desk.',
    content: ['Posture is rarely about “standing straight” alone.', 'The goal is balance, supported breathing, and awareness of how you move during the day.']
  },
  {
    slug: 'return-to-sport-after-knee-injury',
    title: 'A steady return-to-sport plan after knee injury',
    category: 'Rehab',
    categoryClass: 'bg-[#FF6F61] text-white',
    readingTime: '6 min read',
    date: 'Jun 24, 2026',
    imageClass: 'from-[#fff3ef] via-[#fef8f5] to-[#f8dfd8]',
    imageSrc: '/articles/knee-rehab.svg',
    excerpt: 'Progressive rehab helps build trust in the joint before full activity resumes.',
    content: ['Return to sport should feel like a progression, not a leap.', 'We focus on strength, control, confidence, and pain response at each step.']
  },
  {
    slug: 'clinic-update-spring-hours',
    title: 'Clinic update: spring hours and appointments',
    category: 'Clinic News',
    categoryClass: 'bg-slate text-white',
    readingTime: '2 min read',
    date: 'May 16, 2026',
    imageClass: 'from-[#edf2f2] via-[#f7fbfb] to-[#dfe9e9]',
    imageSrc: '/articles/clinic-hours.svg',
    excerpt: 'We’ve added more weekday availability for patients seeking earlier booking slots.',
    content: ['New appointments are open from Monday to Saturday.', 'WhatsApp remains the fastest way to request a visit or ask a care question.']
  }
];

const faqs = [
  { question: 'Do you accept insurance?', answer: 'We support a range of insurers and can advise you on the claim process before your first appointment.' },
  { question: 'How long is an appointment?', answer: 'Initial assessments are about 60 minutes and follow-ups are around 45 minutes.' },
  { question: 'What should I bring to my first visit?', answer: 'Bring comfortable clothes, any relevant reports, and details of medications or prior injuries.' }
];

const stats = [
  { target: 10, suffix: '+', label: 'Years Experience' },
  { target: 5000, suffix: '+', label: 'Patients Helped' },
  { target: 4.9, suffix: '★', label: 'Patient Rating', isDecimal: true }
];

const trustLogos = ['Adamjee Insurance', 'Jubilee Health', 'EFU Health', 'IGI Health', 'Pakistan Physio Assoc.'];
const packageCards = [
  { title: 'Initial Assessment', price: 'PKR 3,500', description: 'A full movement review, history, and personalised care plan.' },
  { title: 'Follow-Up Session', price: 'PKR 2,500', description: 'Hands-on treatment, progress review, and home exercise guidance.' },
  { title: 'Home Visit', price: 'PKR 4,500', description: 'Ideal for patients who prefer one-to-one treatment in a familiar environment.' }
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physiotherapy',
  name: 'Aurora Wellness Physiotherapy',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop 12, First Floor, Mehran Plaza, G-9/3',
    addressLocality: 'Islamabad',
    addressCountry: 'PK'
  },
  telephone: '+923015558123',
  openingHours: 'Mo-Sa 09:00-19:00',
  url: 'https://aurorawellness.pk'
};

function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-white/70 backdrop-blur transition-all ${solid ? 'bg-white/90 shadow-soft' : 'bg-white/70'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#008C8A,#2fb3a9)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" fill="white" />
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-slate">Aurora</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">Wellness</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate/80 lg:flex">
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal transition-colors')}>Services</NavLink>
          <NavLink to="/conditions" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal transition-colors')}>Conditions</NavLink>
          <NavLink to="/team" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal transition-colors')}>Team</NavLink>
          <NavLink to="/results" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal transition-colors')}>Results</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal transition-colors')}>About</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+923015558123" className="hidden items-center gap-1.5 text-sm font-medium text-slate/70 hover:text-teal sm:inline-flex">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            +92 301 555 8123
          </a>
          <a href="https://wa.me/923015558123" className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5">
            <span className="mr-1">💬</span> WhatsApp
          </a>
          <a href="#appointment" className="rounded-full bg-[linear-gradient(135deg,#008C8A,#2fb3a9)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}

function PageShell({ title, description, children, schema }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,140,138,0.10),_transparent_40%),linear-gradient(180deg,#f9fcfc_0%,#eef5f5_100%)] text-slate">
      <a href="#maincontent" className="sr-only focus:not-sr-only focus-visible:focus-visible">Skip to main content</a>
      <Helmet>
        <title>{title} | Aurora Wellness Physiotherapy</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#008C8A" />
        {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
      </Helmet>
      <Header />
      <main id="maincontent">{children}</main>
      <footer className="bg-[#1a2327] px-6 py-16 text-[15px] text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr_1fr_1.5fr] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#008C8A,#2fb3a9)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-white">Aurora</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">Wellness</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[13px] leading-6 text-white/60">
              Private physiotherapy &amp; sports rehabilitation clinic in Islamabad. Helping you get back to pain-free movement.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white">Quick Links</h4>
            <div className="mt-6 flex flex-col gap-4 text-[13px] text-white/60">
              <Link to="/services" className="hover:text-teal transition-colors">Services</Link>
              <Link to="/team" className="hover:text-teal transition-colors">Our Team</Link>
              <Link to="/results" className="hover:text-teal transition-colors">Results</Link>
              <Link to="/about" className="hover:text-teal transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <div className="mt-6 flex flex-col gap-4 text-[13px] text-white/60">
              <p>Shop 12, 1st Floor, Mehran Plaza<br/>G-9/3, Islamabad</p>
              <a href="tel:+923015558123" className="text-teal hover:text-white transition-colors">+92 301 555 8123</a>
              <a href="mailto:hello@aurorawellness.pk" className="text-teal hover:text-white transition-colors">hello@aurorawellness.pk</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8 text-[12px] text-white/40 md:flex md:items-center md:justify-between">
          <p>© 2026 Aurora Wellness Physiotherapy. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = 'center' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="inline-block rounded-full bg-teal/15 px-4 py-1.5 text-[15px] font-medium text-teal">{eyebrow}</p>
      <h2 className="mt-5 text-[2.2rem] font-bold leading-tight text-slate sm:text-5xl">{title}</h2>
      {copy ? <p className="mx-auto mt-4 max-w-2xl text-lg text-slate/70">{copy}</p> : null}
    </div>
  );
}

function ServiceIcon({ type }) {
  const commonProps = {
    className: 'h-7 w-7 stroke-[1.8]',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };

  switch (type) {
    case 'spine':
      return (
        <svg {...commonProps}>
          <path d="M7 4.5a2.5 2.5 0 1 0 0 5" />
          <path d="M7 9.5v5.2c0 1.7 1.1 3.2 2.8 3.8l1.4.6" />
          <path d="M16 5.5a2.5 2.5 0 1 0 0 5" />
          <path d="M16 10.5v4c0 2.5-1.4 4.8-3.6 5.8" />
          <path d="M7 16.5l3 2 4-4 3 2" />
        </svg>
      );
    case 'knee':
      return (
        <svg {...commonProps}>
          <path d="M5 7.6c0-1.5 1.2-2.7 2.7-2.7h2.4c1.8 0 3.3 1.5 3.3 3.3v1.1c0 1.3.9 2.4 2.2 2.6l1.5.3c1.1.2 1.9 1.2 1.9 2.3v2.4c0 1.4-1.2 2.6-2.6 2.6H8.8c-2 0-3.8-1.4-4.4-3.4L4 14.4c-.6-2 .3-4.2 2.1-5.2Z" />
          <path d="M13.4 8.2 10.8 5.6" />
        </svg>
      );
    case 'shoulder':
      return (
        <svg {...commonProps}>
          <path d="M8.7 4.8c-.8 1-.9 2.4-.3 3.5l1.2 2" />
          <path d="M10.2 10.3c.5 1 1.2 1.8 2.2 2.3l2.1.8c1.2.4 2 1.5 2 2.8v1.7" />
          <path d="M7.7 10.7 5.8 13.5c-.7.8-.7 2.1 0 2.9l1.6 1.8" />
          <path d="M13.6 9.6c1.8-.7 3.7-.3 5 .7" />
        </svg>
      );
    default:
      return null;
  }
}

function AppointmentForm() {
  const initialState = { name: '', phone: '', email: '', preferredDate: '', concern: '', consent: false };
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting your request...');
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to submit request');
      setStatus('Thanks — your appointment request has been received.');
      setFormData(initialState);
    } catch (error) {
      setStatus(error.message || 'Unable to submit request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/60 bg-[#f2f7f7] p-8 shadow-soft lg:p-10">
      <h3 className="text-xl font-bold text-slate">Request an appointment</h3>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" aria-label="Full name" required value={formData.name} onChange={handleChange} className="rounded-[14px] border border-slate/10 bg-white px-4 py-3.5 outline-none ring-0 focus:border-teal" placeholder="Full name" />
          <input name="phone" aria-label="Phone number" required value={formData.phone} onChange={handleChange} className="rounded-[14px] border border-slate/10 bg-white px-4 py-3.5 outline-none ring-0 focus:border-teal" placeholder="Phone number" />
        </div>
        <input name="email" aria-label="Email address" type="email" value={formData.email} onChange={handleChange} className="rounded-[14px] border border-slate/10 bg-white px-4 py-3.5 outline-none ring-0 focus:border-teal" placeholder="Email address" />
        <input name="preferredDate" aria-label="Preferred date" value={formData.preferredDate} onChange={handleChange} className="rounded-[14px] border border-slate/10 bg-white px-4 py-3.5 outline-none ring-0 focus:border-teal" placeholder="Preferred date / time" />
        <textarea name="concern" aria-label="Concern" rows="4" value={formData.concern} onChange={handleChange} className="rounded-[14px] border border-slate/10 bg-white px-4 py-3.5 outline-none ring-0 focus:border-teal" placeholder="What can we help you with?" />
        <label className="mt-1 flex items-start gap-3 text-[13px] text-slate/70">
          <input type="checkbox" required checked={formData.consent} onChange={(event) => setFormData((prev) => ({ ...prev, consent: event.target.checked }))} className="mt-0.5 rounded border-slate/20 text-teal focus:ring-teal" />
          <span>I consent to being contacted about my appointment request.</span>
        </label>
        <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#008C8A,#007A78)] px-4 py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Request Appointment
        </button>
        {status ? <p className="text-sm text-slate/70">{status}</p> : null}
      </div>
    </form>
  );
}

function AppointmentSection() {
  return (
    <section id="appointment" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div>
          <p className="inline-block rounded-full bg-[#dcf1ee] px-4 py-1.5 text-[15px] font-medium text-teal">Visit Us</p>
          <h2 className="mt-5 text-[2.2rem] font-bold leading-tight text-slate sm:text-5xl">Find us in G-9/3, Islamabad</h2>
          
          <div className="mt-10 grid gap-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dcf1ee] text-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate">Address</p>
                <p className="mt-1 text-slate/70">Shop 12, First Floor, Mehran Plaza, G-9/3, Islamabad</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dcf1ee] text-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate">Hours</p>
                <p className="mt-1 text-slate/70">Mon–Sat: 9:00–19:00 | Sun: Closed</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dcf1ee] text-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate">Phone</p>
                <p className="mt-1 text-slate/70">+92 301 555 8123</p>
              </div>
            </div>
          </div>
        </div>
        <AppointmentForm />
      </div>
    </section>
  );
}

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="surface-card rounded-[24px] border border-white bg-white p-5 shadow-soft">
            <button type="button" className="flex w-full items-center justify-between text-left" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span className="font-semibold text-slate">{item.question}</span>
              <span className="text-xl text-teal">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm leading-7 text-slate/70">
                {item.answer}
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PatientResults() {
  const reviews = [
    { name: 'Hamza K.', treatment: 'Sports Rehab', initial: 'H', quote: 'I ran 10k again after 6 weeks! The team understood my goals and pushed me just enough.' },
    { name: 'Rabia A.', treatment: 'Rotator Cuff', initial: 'R', quote: 'Shoulder pain gone; back to work. Genuinely the most caring clinic I have been to.' },
    { name: 'Adeel S.', treatment: 'Post-Surgery', initial: 'A', quote: 'Professional, caring team. They explained every step and I never felt rushed.' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow="Patient Results" title="Real stories. Real recoveries." align="center" eyebrowClass="bg-[#FF6F61]/15 text-[#FF6F61]" />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name} className="flex flex-col justify-between rounded-[32px] border border-white/80 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-teal/40">
                <path d="M10 11h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h3v8l-3 5" />
                <path d="M20 11h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h3v8l-3 5" />
              </svg>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#FF6F61]">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-7 text-slate/80">“{review.quote}”</p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate/5 pt-6">
              <div>
                <p className="font-bold text-slate">{review.name}</p>
                <p className="text-[12px] font-medium text-teal">{review.treatment}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#008C8A,#007A78)] font-bold text-white shadow-sm">
                {review.initial}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-[linear-gradient(135deg,#008C8A,#007A78)] py-20 text-center text-white sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-1.5 text-[13px] font-medium text-white/90">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#FF6F61]"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          Start your recovery today
        </div>
        <h2 className="mt-6 text-[2.6rem] font-bold leading-tight sm:text-[3.5rem]">
          Your first step toward pain-<br className="hidden sm:block"/>free movement starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-white/80">
          Book your initial assessment with our expert team. Same-week appointments available.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#appointment" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-teal transition-transform hover:-translate-y-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Book an Appointment
          </a>
          <a href="https://wa.me/923015558123" className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

function AnimatedDecimalStat({ target, suffix = '', label, valueColor = 'text-teal', labelColor = 'text-slate/60' }) {
  const { count, ref } = useCountUp(Math.round(target * 10), 2200);
  const display = (count / 10).toFixed(1);
  return (
    <div ref={ref} className="hero-stat flex flex-col items-center text-center">
      <p className={`text-[2rem] font-bold leading-none sm:text-[2.4rem] ${valueColor}`}>
        {display}{suffix}
      </p>
      <p className={`mt-1 text-sm ${labelColor}`}>{label}</p>
    </div>
  );
}

function HomePage() {
  return (
    <PageShell title="Home" description="Private physiotherapy and sports rehab clinic in Islamabad G-9/3 with calm, expert-led care." schema={localBusinessSchema}>
      <section className="hero-section relative mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="relative">
          <div className="absolute -left-5 top-0 h-36 w-36 rounded-full bg-teal/10 blur-3xl" />

          {/* Accepting patients pulse */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-teal/15 bg-white/85 px-4 py-2 text-sm font-medium text-slate shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
            </span>
            Now accepting new patients in Islamabad
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-7 text-[2.6rem] font-semibold leading-[1.12] text-slate sm:text-[3.4rem] lg:text-[3.8rem]"
          >
            Get Back<br />to{' '}
            <span className="shimmer-text">Pain-Free</span>
            <br />Movement.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-lg text-[1.05rem] leading-7 text-slate/65"
          >
            Expert physiotherapy and sports rehabilitation in G-9/3, Islamabad.
            Personalized care that helps you move better, recover faster, and
            live without limits.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#appointment" className="btn-primary">
              <span className="mr-1">📅</span> Book an Appointment →
            </a>
            <a href="https://wa.me/923015558123" className="btn-secondary">
              <span className="mr-1">💬</span> Chat on WhatsApp
            </a>
          </motion.div>

          {/* Animated counters — flat, no card boxes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-start gap-8 sm:gap-12"
          >
            {stats.map((item) =>
              item.isDecimal ? (
                <AnimatedDecimalStat
                  key={item.label}
                  target={item.target}
                  suffix={item.suffix}
                  label={item.label}
                />
              ) : (
                <AnimatedStat
                  key={item.label}
                  target={item.target}
                  suffix={item.suffix}
                  label={item.label}
                />
              )
            )}
          </motion.div>
        </div>

        {/* 3D Hero scene */}
        <div className="flex items-center justify-center relative">
          <Hero3D />
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-[32px] w-[20px] justify-center rounded-[10px] border-2 border-teal/40 pt-[4px]">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[4px] w-[2.5px] rounded-full bg-teal"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate/5 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate/40">Trusted by patients & partnered with leading insurers</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-[15px] font-bold text-slate/50">
            {trustLogos.map((logo) => (
              <span key={logo} className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Our Services" title="Specialized care for every stage of recovery" copy="From your first assessment to full return-to-function, our team builds a plan around you." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <motion.article
              key={service.slug}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 24px 60px rgba(31, 42, 48, 0.12)' }}
              className="group surface-card rounded-[24px] border border-white/80 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-teal transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-teal group-hover:text-white">
                  <ServiceIcon type={service.icon} />
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${service.tagClass}`}>{service.tag}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">{service.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.meta.map((item) => (
                  <span key={item} className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-slate/70">{item}</span>
                ))}
              </div>
              <Link to={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                Learn more
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Dark stats band */}
      <section className="bg-slate py-16 text-white shadow-soft">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-6 lg:gap-24 lg:px-8">
          <AnimatedStat target={10} suffix="+" label="Years Experience" valueColor="text-white" labelColor="text-white/60" />
          <AnimatedStat target={5000} suffix="+" label="Patients Helped" valueColor="text-white" labelColor="text-white/60" />
          <AnimatedStat target={92} suffix="%" label="Recovery Rate" valueColor="text-white" labelColor="text-white/60" />
          <AnimatedDecimalStat target={4.9} suffix="★" label="Patient Rating" valueColor="text-[#FF6F61]" labelColor="text-white/60" />
        </div>
      </section>

      <PatientResults />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Latest articles" title="Practical guidance for recovery and everyday movement." copy="From post-surgery tips to return-to-sport planning, we share calm, useful resources for patients." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <motion.article
              key={article.slug}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 24px 60px rgba(31, 42, 48, 0.12)' }}
              className="group overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <Link to={`/blog/${article.slug}`} className="block">
                <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${article.imageClass}`}>
                  <img src={article.imageSrc} alt={article.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.8),_transparent_45%)]" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate">{article.category}</div>
                </div>
                <div className="p-7 pb-6">
                  <div className="flex items-center justify-between gap-3 text-sm text-slate/60">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${article.categoryClass}`}>{article.category}</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate/70">{article.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate/10 pt-4">
                    <span className="text-sm text-slate/60">{article.date}</span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                      Read article
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaSection />
      
      <AppointmentSection />
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell title="Services" description="Explore our physiotherapy and rehab services for pain relief, movement recovery, and stronger daily function.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,rgba(0,140,138,0.12),rgba(255,255,255,0.92))] p-8 shadow-[0_18px_60px_rgba(31,42,48,0.08)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/85 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-teal shadow-sm">Our services</p>
              <h1 className="mt-5 text-[2.4rem] font-semibold leading-tight text-slate sm:text-[3rem]">Care designed for healing, strength, and daily confidence.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate/70">We blend hands-on treatment, movement coaching, and practical progression plans to help you recover with clarity, comfort, and measurable momentum.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Personalized plans', 'Evidence-led rehab', 'Same-week support'].map((item) => (
                  <span key={item} className="rounded-full border border-teal/15 bg-white/80 px-3 py-2 text-sm font-medium text-slate shadow-sm">{item}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { title: 'Assessment', copy: 'A calm movement review and tailored care path.' },
                { title: 'Rehab', copy: 'Structured strength, mobility, and confidence work.' },
                { title: 'Progress', copy: 'Clear milestones that support long-term recovery.' }
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-soft">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate/70">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <motion.article
              key={service.slug}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 24px 60px rgba(31, 42, 48, 0.12)' }}
              className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/95 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(135deg,rgba(0,140,138,0.10),rgba(255,111,97,0.04))]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-teal transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-teal group-hover:text-white">
                    <ServiceIcon type={service.icon} />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${service.tagClass}`}>{service.tag}</span>
                </div>

                <h3 className="mt-6 text-[1.45rem] font-semibold text-slate">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate/70">{service.excerpt}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.meta.map((item) => (
                    <span key={item} className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-slate/70">{item}</span>
                  ))}
                </div>

                <div className="mt-6 rounded-[20px] border border-slate/10 bg-mist/60 p-4">
                  <p className="text-sm font-semibold text-slate">What to expect</p>
                  <p className="mt-2 text-sm leading-7 text-slate/70">{service.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate/10 pt-4">
                  <span className="text-sm text-slate/60">Designed for comfort and recovery</span>
                  <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                    Explore
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-[30px] border border-white/80 bg-slate px-7 py-8 text-white shadow-soft">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Recovery journey</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">A clear path from discomfort to confidence.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: '1. Assess', copy: 'Understand the cause and set realistic targets.' },
                { title: '2. Treat', copy: 'Restore strength, mobility, and control.' },
                { title: '3. Return', copy: 'Build confidence for everyday life and sport.' }
              ].map((step) => (
                <div key={step.title} className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF6F61]">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppointmentSection />
    </PageShell>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <PageShell title={service.title} description={service.excerpt}>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Service detail</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate">{service.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate/70">{service.description}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Benefits</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate/70">
              {service.benefits.map((benefit) => <li key={benefit} className="flex gap-3"><span className="text-teal">✓</span><span>{benefit}</span></li>)}
            </ul>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Who is this for?</h2>
            <p className="mt-4 text-sm leading-7 text-slate/70">{service.whoFor}</p>
            <div className="mt-6 rounded-[24px] border border-mist bg-mist/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Need a quick answer?</p>
              <p className="mt-3 text-sm leading-7 text-slate/70">We can help you decide whether a session is the right next step for your concern.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-semibold text-slate">Frequently asked questions</h2>
            <div className="mt-6"><FaqAccordion items={service.faq} /></div>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Ready to begin?</h2>
            <p className="mt-4 text-sm leading-7 text-slate/70">Schedule a first visit and we’ll build a calm, practical plan around your symptoms and goals.</p>
            <a href="https://wa.me/923015558123" className="btn-primary mt-6">Start a WhatsApp chat</a>
          </div>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function ConditionsPage() {
  return (
    <PageShell title="Conditions" description="See how we support common musculoskeletal and rehabilitation needs in a thoughtful, evidence-led way.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Conditions" title="Support for common pain, injury, and recovery concerns." copy="We look at symptoms, movement patterns, and daily habits to build a plan that feels manageable and effective." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {conditions.map((condition) => (
            <article key={condition.slug} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate">{condition.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">{condition.summary}</p>
              <Link to={`/conditions/${condition.slug}`} className="mt-5 inline-flex text-sm font-semibold text-teal">Read more →</Link>
            </article>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function ConditionDetailPage() {
  const { slug } = useParams();
  const condition = conditions.find((item) => item.slug === slug);

  if (!condition) {
    return <NotFoundPage />;
  }

  return (
    <PageShell title={condition.title} description={condition.summary}>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Condition guide</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate">{condition.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate/70">{condition.summary}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Common symptoms</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">{condition.symptoms.map((item) => <li key={item} className="flex gap-3"><span className="text-teal">•</span><span>{item}</span></li>)}</ul>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Common causes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">{condition.causes.map((item) => <li key={item} className="flex gap-3"><span className="text-teal">•</span><span>{item}</span></li>)}</ul>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Home care tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">{condition.tips.map((item) => <li key={item} className="flex gap-3"><span className="text-teal">•</span><span>{item}</span></li>)}</ul>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">When to see a physiotherapist</h2>
            <p className="mt-4 text-sm leading-7 text-slate/70">{condition.whenToSee}</p>
          </div>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function TeamPage() {
  return (
    <PageShell title="Our team" description="Meet the physiotherapists behind Aurora Wellness and learn how each practitioner supports recovery.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Our team" title="Experienced clinicians with a calm, personal approach to rehab." copy="From orthopaedic care to women’s health and return-to-sport planning, our clinicians combine expertise with compassion." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((person) => (
            <article key={person.slug} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate">{person.name}</h3>
              <p className="mt-2 text-sm font-semibold text-teal">{person.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate/70">{person.bio}</p>
              <Link to={`/team/${person.slug}`} className="mt-5 inline-flex text-sm font-semibold text-teal">View profile →</Link>
            </article>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function TeamDetailPage() {
  const { slug } = useParams();
  const person = team.find((item) => item.slug === slug);

  if (!person) {
    return <NotFoundPage />;
  }

  return (
    <PageShell title={person.name} description={`${person.name} at Aurora Wellness Physiotherapy.`}>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Practitioner profile</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate">{person.name}</h1>
            <p className="mt-3 text-sm font-semibold text-teal">{person.title}</p>
            <p className="mt-6 text-sm leading-8 text-slate/70">{person.bio}</p>
          </div>
          <div className="space-y-6">
            <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">Credentials</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">{person.credentials.map((item) => <li key={item} className="flex gap-3"><span className="text-teal">•</span><span>{item}</span></li>)}</ul>
            </div>
            <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">Specialties</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">{person.specialties.map((item) => <li key={item} className="flex gap-3"><span className="text-teal">•</span><span>{item}</span></li>)}</ul>
            </div>
          </div>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function PricingPage() {
  return (
    <PageShell title="Pricing & Insurance" description="Review our care packages, insurance support, and the steps to claim treatment.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Pricing & insurance" title="Transparent options for private care and supported claims." copy="We’re happy to guide you through your options, whether you are paying privately or using insurance benefits." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packageCards.map((card) => (
            <article key={card.title} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">{card.description}</p>
              <p className="mt-5 text-2xl font-semibold text-teal">{card.price}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Insurance support</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {trustLogos.map((logo) => <span key={logo} className="rounded-full border border-teal/10 bg-mist/70 px-4 py-2 text-sm font-medium text-slate">{logo}</span>)}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate/70">Bring your policy or claim details and our team will explain the steps clearly before you proceed.</p>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Claim steps</h2>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-slate/70">
              <li>1. Confirm your insurer and coverage details.</li>
              <li>2. Share the visit summary and policy details.</li>
              <li>3. We help prepare the documentation and answer your questions.</li>
            </ol>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate">Common questions</h2>
          <div className="mt-6"><FaqAccordion items={faqs} /></div>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function ResultsPage() {
  const [selectedCondition, setSelectedCondition] = useState('all');
  const filteredResults = selectedCondition === 'all' ? testimonials : testimonials.filter((item) => item.treatment.toLowerCase().includes(selectedCondition));

  return (
    <PageShell title="Results & testimonials" description="Read patient outcomes and rehabilitation stories from Aurora Wellness.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Results" title="Progress that feels meaningful and measurable." copy="We focus on returning patients to movement, strength, and confidence in everyday life." />
        <div className="mt-8 flex items-center gap-3">
          <label htmlFor="condition-filter" className="text-sm font-medium text-slate">Filter by condition</label>
          <select id="condition-filter" value={selectedCondition} onChange={(event) => setSelectedCondition(event.target.value)} className="rounded-full border border-slate/15 bg-white px-4 py-2 text-sm text-slate">
            <option value="all">All stories</option>
            <option value="knee">Knee</option>
            <option value="shoulder">Shoulder</option>
            <option value="post-op">Post-op</option>
          </select>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredResults.map((item) => (
            <article key={item.name} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">{item.treatment}</p>
              <p className="mt-4 text-lg leading-8 text-slate">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-slate">{item.name}</p>
            </article>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function BlogPage() {
  return (
    <PageShell title="Blog & articles" description="Read practical articles about recovery, rehab, and everyday movement guidance.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Blog" title="Articles for recovery, resilience, and informed movement." copy="We share calm, practical content that helps patients understand what good healing looks like." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} to={`/blog/${article.slug}`} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">{article.category}</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function BlogPostPage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <PageShell title={article.title} description={article.excerpt}>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">{article.category}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate">{article.title}</h1>
            <div className="mt-6 space-y-4 text-sm leading-8 text-slate/70">
              {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-6">
            <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">On this page</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">
                <li>• Why the topic matters</li>
                <li>• Practical takeaways</li>
                <li>• When to seek care</li>
              </ul>
            </div>
            <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">Related posts</h2>
              <div className="mt-4 space-y-3">
                {articles.filter((item) => item.slug !== article.slug).slice(0, 2).map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="block text-sm font-semibold text-teal">{item.title}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell title="About the clinic" description="Discover the story behind Aurora Wellness, our values, and the care philosophy that guides every appointment.">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">About Aurora Wellness</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">A boutique clinic built around calm care, expert guidance, and patient trust.</h1>
          <p className="mt-6 text-sm leading-8 text-slate/70">Aurora Wellness Physiotherapy was created to bring a more reassuring, personal experience to physiotherapy in Islamabad. We combine thoughtful assessment with practical rehab, always keeping the patient’s comfort and long-term movement goals in focus.</p>
        </div>
        <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
          <img src="/clinic-room.svg" alt="A calm physiotherapy treatment room" className="h-64 w-full rounded-[24px] object-cover" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Years in practice', '10+'],
            ['Patients helped', '5,000+'],
            ['Care philosophy', 'Calm, evidence-led, patient-first']
          ].map(([label, value]) => (
            <div key={label} className="surface-card rounded-[28px] border border-white bg-white p-7 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate">{value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Our values</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate/70">
              <li>• Calm, reassuring care that never feels clinical or rushed.</li>
              <li>• Clear exercise plans that patients can actually follow.</li>
              <li>• Thoughtful progression that respects pain, lifestyle, and recovery stages.</li>
            </ul>
          </div>
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate">Facility</h2>
            <p className="mt-4 text-sm leading-7 text-slate/70">We offer a private, tidy treatment space in Mehran Plaza with a focus on comfort and ease for every visit.</p>
          </div>
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell title="Contact & book" description="Book an appointment with Aurora Wellness in Islamabad or reach out with questions about care and availability.">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Contact & book</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">We’re here when you’re ready for a calmer next step.</h1>
          <p className="mt-5 text-lg leading-8 text-slate/70">Visit us in person, phone our team, or start a WhatsApp conversation for a quick reply.</p>
          <div className="mt-8 space-y-4 rounded-[28px] border border-white bg-white p-7 shadow-soft">
            <p><span className="font-semibold text-slate">Address</span><br />Shop 12, First Floor, Mehran Plaza, G-9/3, Islamabad</p>
            <p><span className="font-semibold text-slate">Hours</span><br />Mon–Sat: 09:00–19:00 • Sun closed</p>
            <p><span className="font-semibold text-slate">Phone</span><br />+92 301 555 8123</p>
            <p><span className="font-semibold text-slate">Email</span><br />hello@aurorawellness.pk</p>
          </div>
        </div>
        <AppointmentForm />
      </section>
    </PageShell>
  );
}

function LegalPage({ title, description, children }) {
  return (
    <PageShell title={title} description={description}>
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">{title}</h1>
          <div className="mt-6 space-y-4 text-sm leading-8 text-slate/70">{children}</div>
        </div>
      </section>
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageShell title="Page not found" description="The page you requested could not be found.">
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <div className="surface-card rounded-[32px] border border-white bg-white p-10 text-center shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate">This page moved or doesn’t exist yet.</h1>
          <p className="mt-4 text-slate/70">Head back home or contact the clinic for help finding the information you need.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/" className="btn-primary">Back home</Link>
            <Link to="/contact" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/conditions" element={<ConditionsPage />} />
      <Route path="/conditions/:slug" element={<ConditionDetailPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/team/:slug" element={<TeamDetailPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<LegalPage title="Privacy policy" description="How Aurora Wellness handles patient information and privacy requests."><p>We collect only the information needed to manage appointments and provide care. Your information is stored securely and used only for clinic communication, scheduling, and requested care services.</p><p>If you would like access to or correction of your personal data, please contact the clinic directly.</p></LegalPage>} />
      <Route path="/terms" element={<LegalPage title="Terms of service" description="Clinic terms for appointments and care."><p>Appointments are confirmed on request and may be changed with reasonable notice.</p><p>We recommend arriving a few minutes early for your first visit and bringing any relevant clinical notes.</p></LegalPage>} />
      <Route path="/cookies" element={<LegalPage title="Cookie notice" description="How cookies are used on the Aurora Wellness website."><p>This site may use basic cookies to improve browsing experience and remember user preferences.</p><p>You may disable cookies in your browser settings, although some features may be limited as a result.</p></LegalPage>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
