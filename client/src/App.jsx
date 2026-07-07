import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';

const services = [
  {
    title: 'Back Pain Therapy',
    description: 'Evidence-led treatment for chronic and acute back pain, posture, and movement recovery.'
  },
  {
    title: 'Knee Rehab',
    description: 'Restore mobility, stability, and confidence with guided rehabilitation plans.'
  },
  {
    title: 'Sports Injury Care',
    description: 'Recovery support for runners, athletes, and active patients of all ages.'
  },
  {
    title: 'Post-Surgery Recovery',
    description: 'Structured rehab to rebuild strength and confidence after surgery.'
  }
];

const team = [
  { name: 'Dr. Sana Qureshi', title: 'Senior Physiotherapist', bio: 'Specializes in sports rehab, post-op recovery, and movement retraining.' },
  { name: 'Ali Raza', title: 'Physiotherapist', bio: 'Focused on mobility, strength, and return-to-sport programming.' },
  { name: 'Zoya Khan', title: 'Women’s Health PT', bio: 'Supports women through pelvic health, postpartum recovery, and pain relief.' }
];

const testimonials = [
  { name: 'Hina', quote: 'The team gave me a clear plan and helped me return to running faster than expected.', rating: 5 },
  { name: 'Muneeb', quote: 'Professional, compassionate, and very focused on results.', rating: 5 },
  { name: 'Sadia', quote: 'I felt supported every step of the way after my surgery.', rating: 5 }
];

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '5,000+', label: 'Patients Helped' },
  { value: '92%', label: 'Recovery Rate' }
];

function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(()=>{
    function onScroll(){ setSolid(window.scrollY>24); }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${solid? 'bg-white/95 shadow-sm border-b':'bg-white/60'} backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-teal flex items-center justify-center text-white font-bold">AW</div>
          <Link to="/" className="text-lg font-semibold tracking-tight text-teal">Aurora Wellness</Link>
        </div>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link to="/services" className="hover:text-teal">Services</Link>
          <Link to="/team" className="hover:text-teal">Team</Link>
          <Link to="/results" className="hover:text-teal">Results</Link>
          <Link to="/contact" className="hover:text-teal">Contact</Link>
        </nav>

        <div className="header-cta hidden md:flex items-center">
          <a href="https://wa.me/923015558123" className="btn-whatsapp">WhatsApp</a>
          <a href="#appointment" className="ml-4 btn-book">Book Now</a>
        </div>
      </div>
    </header>
  );
}

function PageShell({ title, description, children }) {
  return (
    <div className="min-h-screen bg-mist text-slate">
      <a href="#maincontent" className="sr-only focus:not-sr-only focus-visible:focus-visible">Skip to main content</a>
      <Helmet>
        <title>{title} | Aurora Wellness Physiotherapy</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header />
      <main id="maincontent">{children}</main>
      <footer className="border-t border-white/70 bg-white/70 px-6 py-8 text-sm text-slate/70 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aurora Wellness Physiotherapy</p>
          <div className="flex gap-4">
            <Link to="/services" className="hover:text-teal">Services</Link>
            <Link to="/contact" className="hover:text-teal">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <PageShell title="Home" description="Private physiotherapy and sports rehab clinic based in Islamabad G-9/3.">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-teal/20 bg-white px-3 py-1 text-sm font-medium text-teal">Accepting patients • Islamabad G-9/3</p>
          <h1 className="font-[Poppins] text-4xl font-bold leading-tight text-slate sm:text-6xl">Pain-free movement starts with <span className="text-teal">expert care</span>.</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate/80">Trusted physiotherapy and sports rehab for back pain, knee recovery, shoulder care, and post-surgery rehabilitation.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#appointment" className="rounded-full bg-teal px-6 py-3 font-semibold text-white shadow-soft">Book an Appointment</a>
            <a href="https://wa.me/923015558123" className="rounded-full border border-slate/20 bg-white px-6 py-3 font-semibold text-slate">Chat on WhatsApp</a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white bg-white/70 p-6 shadow-soft">
                <p className="text-3xl font-bold text-teal">{item.value}</p>
                <p className="text-sm text-slate/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Hero3D />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-[32px] border border-white/70 bg-slate p-8 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Trusted by patients</p>
          <div className="mt-4 flex flex-wrap gap-4 text-lg font-medium text-white/80">
            <span>Blue Cross</span><span>Sehat Card</span><span>Adamjee</span><span>EFU</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Services</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate">Recovery plans tailored to your goals.</h2>
          </div>
          <Link to="/services" className="hidden text-sm font-semibold text-teal md:block">View all services</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
            {services.slice(0, 4).map((service) => (
            <div key={service.title} className="service-card rounded-[28px] border border-white bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-slate">{service.title}</h3>
              <p className="mt-3 text-sm text-slate/70">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-white bg-white p-8 shadow-soft">
          <h2 className="text-3xl font-semibold text-slate">What patients say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -6 }} className="rounded-[24px] border border-mist bg-mist/60 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-coral">{Array(item.rating).fill('★').join('')}</p>
                  <div className="h-8 w-8 rounded-full bg-teal text-white flex items-center justify-center font-semibold">{item.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                </div>
                <p className="mt-3 text-lg text-slate">“{item.quote}”</p>
                <p className="mt-4 font-semibold text-slate">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentSection />
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell title="Services" description="Explore our physiotherapy and rehab specialties in Islamabad.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Services</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">Care plans for pain relief, rebuilding strength, and returning to life.</h1>
          <p className="mt-4 text-lg text-slate/70">Every plan is personalized, measurable, and designed to support long-term movement confidence.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="service-card rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">{service.title}</h2>
              <p className="mt-3 text-slate/70">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function TeamPage() {
  return (
    <PageShell title="Team" description="Meet the Aurora Wellness physiotherapy team in Islamabad.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Our team</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">Experienced clinicians focused on outcomes and comfort.</h1>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((person) => (
            <div key={person.name} className="rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">{person.name}</h2>
              <p className="mt-2 text-sm font-semibold text-teal">{person.title}</p>
              <p className="mt-4 text-slate/70">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function ResultsPage() {
  return (
    <PageShell title="Results" description="See the outcomes Aurora Wellness patients experience through rehab and recovery support.">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Results</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">Focused rehab, measurable progress, and a stronger return to daily life.</h1>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            ['Back pain', 'Reduced pain and improved posture within guided care plans.'],
            ['Sports injury', 'Improved strength and return-to-play readiness.'],
            ['Post-op recovery', 'Better mobility, confidence, and movement mechanics.']
          ].map(([title, text]) => (
            <div key={title} className="rounded-[28px] border border-white bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate">{title}</h2>
              <p className="mt-3 text-slate/70">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <AppointmentSection />
    </PageShell>
  );
}

function AppointmentSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', preferredDate: '', concern: '', consent: false });
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
      setStatus('Thank you. Your appointment request has been received.');
      setFormData({ name: '', phone: '', email: '', preferredDate: '', concern: '' });
    } catch (error) {
      setStatus(error.message || 'Unable to submit request');
    }
  };

  return (
    <section id="appointment" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Visit Us</p>
          <h2 className="mt-2 text-4xl font-semibold text-slate">Find us in G-9/3, Islamabad</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">📍</div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-slate/70">Shop 12, First Floor, Mehran Plaza, G-9/3, Islamabad</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">⏰</div>
              <div>
                <p className="font-semibold">Hours</p>
                <p className="text-slate/70">Mon–Sat: 09:00–19:00</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">📞</div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-slate/70">+92 301 555 8123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8">
          <h3 className="text-xl font-semibold text-deep-slate">Request an appointment</h3>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input name="name" aria-label="Full name" required value={formData.name} onChange={handleChange} className="rounded-lg border border-white/20 px-4 py-3" placeholder="Full name" />
              <input name="phone" aria-label="Phone number" required value={formData.phone} onChange={handleChange} className="rounded-lg border border-white/20 px-4 py-3" placeholder="Phone number" />
            </div>
            <input name="email" aria-label="Email" type="email" value={formData.email} onChange={handleChange} className="rounded-lg border border-white/20 px-4 py-3" placeholder="Email address" />
            <input name="preferredDate" aria-label="Preferred date" value={formData.preferredDate} onChange={handleChange} className="rounded-lg border border-white/20 px-4 py-3" placeholder="Preferred date / time" />
            <textarea name="concern" aria-label="Concern" rows="4" value={formData.concern} onChange={handleChange} className="rounded-lg border border-white/20 px-4 py-3" placeholder="What can we help you with?" />
            <label className="inline-flex items-center gap-3 text-sm">
              <input type="checkbox" required checked={!!formData.consent} onChange={(e)=>setFormData(prev=>({...prev, consent: e.target.checked}))} className="focus-visible" />
              I consent to being contacted about my appointment request.
            </label>
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-white shadow-soft">📅 Request Appointment</button>
            {status ? <p className="text-sm text-slate/70">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <PageShell title="Contact" description="Contact Aurora Wellness physiotherapy in Islamabad for appointments and questions.">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate">We’re here for your next step toward better movement.</h1>
          <p className="mt-4 text-lg text-slate/70">Book an appointment in person or start a WhatsApp conversation with our team.</p>
          <div className="mt-8 space-y-3 rounded-[28px] border border-white bg-white p-6 shadow-soft">
            <p><strong>Address:</strong> Shop 12, First Floor, Mehran Plaza, G-9/3, Islamabad</p>
            <p><strong>Hours:</strong> Mon–Sat: 09:00–19:00</p>
            <p><strong>Phone:</strong> +92 301 555 8123</p>
            <p><strong>Email:</strong> hello@aurorawellness.pk</p>
          </div>
        </div>
        <AppointmentSection />
      </section>
    </PageShell>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
