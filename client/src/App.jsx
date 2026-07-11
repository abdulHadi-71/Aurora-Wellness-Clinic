import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';

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
  { value: '10+', label: 'Years of clinical experience' },
  { value: '5,000+', label: 'Patients supported' },
  { value: '92%', label: 'Patient satisfaction' }
];

const trustLogos = ['Blue Cross', 'Sehat Card', 'Adamjee', 'EFU'];
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#008C8A,#2fb3a9)] font-semibold text-white">AW</div>
          <div>
            <p className="text-base font-semibold text-slate">Aurora Wellness</p>
            <p className="text-xs text-slate/60">Physiotherapy & Sports Rehab</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate/80 lg:flex">
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>Services</NavLink>
          <NavLink to="/conditions" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>Conditions</NavLink>
          <NavLink to="/team" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>Team</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>Pricing</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-teal' : 'hover:text-teal')}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+923015558123" className="rounded-full border border-teal/20 bg-white/80 px-3 py-2 text-sm font-semibold text-slate shadow-sm hover:border-teal/40 hover:text-teal">Call</a>
          <a href="https://wa.me/923015558123" className="rounded-full bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow-sm">WhatsApp</a>
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
      <footer className="border-t border-white/70 bg-white/80 px-6 py-8 text-sm text-slate/70 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aurora Wellness Physiotherapy • Private clinic in Islamabad</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="hover:text-teal">Services</Link>
            <Link to="/about" className="hover:text-teal">About</Link>
            <Link to="/privacy" className="hover:text-teal">Privacy</Link>
            <Link to="/contact" className="hover:text-teal">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-lg text-slate/70">{copy}</p> : null}
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
    <form onSubmit={handleSubmit} className="surface-card rounded-[32px] border border-white bg-white p-7 shadow-soft">
      <h3 className="text-2xl font-semibold text-slate">Request an appointment</h3>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" aria-label="Full name" required value={formData.name} onChange={handleChange} className="rounded-2xl border border-slate/10 bg-mist/60 px-4 py-3 outline-none ring-0" placeholder="Full name" />
          <input name="phone" aria-label="Phone number" required value={formData.phone} onChange={handleChange} className="rounded-2xl border border-slate/10 bg-mist/60 px-4 py-3 outline-none ring-0" placeholder="Phone number" />
        </div>
        <input name="email" aria-label="Email address" type="email" value={formData.email} onChange={handleChange} className="rounded-2xl border border-slate/10 bg-mist/60 px-4 py-3 outline-none ring-0" placeholder="Email address" />
        <input name="preferredDate" aria-label="Preferred date" value={formData.preferredDate} onChange={handleChange} className="rounded-2xl border border-slate/10 bg-mist/60 px-4 py-3 outline-none ring-0" placeholder="Preferred date / time" />
        <textarea name="concern" aria-label="Concern" rows="4" value={formData.concern} onChange={handleChange} className="rounded-2xl border border-slate/10 bg-mist/60 px-4 py-3 outline-none ring-0" placeholder="What can we help you with?" />
        <label className="flex items-start gap-3 text-sm text-slate/70">
          <input type="checkbox" required checked={formData.consent} onChange={(event) => setFormData((prev) => ({ ...prev, consent: event.target.checked }))} />
          <span>I consent to being contacted about my appointment request.</span>
        </label>
        <button type="submit" className="btn-primary mt-2">Request Appointment</button>
        {status ? <p className="text-sm text-slate/70">{status}</p> : null}
      </div>
    </form>
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

function TestimonialSlider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % items.length), 6000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const item = items[activeIndex];

  return (
    <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Testimonials</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate">Warm words from patients and athletes</h3>
        </div>
        <div className="flex gap-2">
          {items.map((entry, index) => (
            <button key={entry.name} type="button" className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-teal' : 'bg-slate/20'}`} onClick={() => setActiveIndex(index)} aria-label={`Show testimonial from ${entry.name}`} />
          ))}
        </div>
      </div>
      <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[24px] border border-mist bg-mist/70 p-8">
        <p className="text-2xl font-semibold text-slate">“{item.quote}”</p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal">{item.name}</p>
        <p className="mt-2 text-sm text-slate/70">{item.treatment}</p>
      </motion.div>
    </div>
  );
}

function HomePage() {
  return (
    <PageShell title="Home" description="Private physiotherapy and sports rehab clinic in Islamabad G-9/3 with calm, expert-led care." schema={localBusinessSchema}>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="relative">
          <div className="absolute -left-5 top-0 h-32 w-32 rounded-full bg-teal/10 blur-3xl" />
          <p className="inline-flex rounded-full border border-teal/20 bg-white/80 px-3 py-2 text-sm font-medium text-teal shadow-sm">Private clinic • Islamabad G-9/3</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate sm:text-5xl lg:text-6xl">Get back to <span className="shimmer-text">pain-free</span> movement with calm, expert care.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate/70">Aurora Wellness Physiotherapy offers trusted treatment for back pain, knee injury recovery, shoulder rehab, and post-surgery rebuilding in a boutique clinic setting.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#appointment" className="btn-primary">Book an Appointment</a>
            <a href="https://wa.me/923015558123" className="btn-secondary">Chat on WhatsApp</a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="surface-card rounded-[24px] border border-white bg-white/80 p-5 shadow-soft">
                <p className="text-2xl font-semibold text-teal">{item.value}</p>
                <p className="mt-1 text-sm text-slate/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Hero3D />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="rounded-[32px] border border-white/70 bg-slate px-8 py-7 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Trusted by local patients</p>
          <div className="mt-4 flex flex-wrap gap-4 text-lg font-medium text-white/80">
            {trustLogos.map((logo) => <span key={logo}>{logo}</span>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Top services" title="Recovery plans tailored to comfort, strength, and confidence." copy="Every plan is personalised, paced, and designed to feel calm and clear from the first session onward." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
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

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="surface-card rounded-[32px] border border-white bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Before & after</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate">Care that helps patients move better, not just feel better.</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Before', 'Pain and stiffness affected daily movement.'],
                ['After', 'Improved mobility, confidence, and ease of activity.']
              ].map(([label, text]) => (
                <div key={label} className="rounded-[24px] border border-mist bg-mist/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">{label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <TestimonialSlider items={testimonials} />
        </div>
      </section>

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

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,#f4f9f9_0%,#e5f4f3_100%)] p-8 shadow-soft lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Book your visit</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate">Let’s create a care plan you can feel good about.</h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <a href="https://wa.me/923015558123" className="btn-secondary">WhatsApp us</a>
            <Link to="/contact" className="btn-primary">Contact clinic</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell title="Services" description="Explore our physiotherapy and rehab services for pain relief, movement recovery, and stronger daily function.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Services" title="Care designed for healing, strength, and daily confidence." copy="We blend hands-on treatment, movement coaching, and practical progression plans to create a calm, effective experience." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="surface-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-2xl font-semibold text-slate">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">{service.excerpt}</p>
              <Link to={`/services/${service.slug}`} className="mt-5 inline-flex text-sm font-semibold text-teal">Learn more →</Link>
            </article>
          ))}
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
