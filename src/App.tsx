import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES  — Space Grotesk + Material + all visual effects
───────────────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
*,body{font-family:'Space Grotesk',sans-serif;box-sizing:border-box}
html{scroll-behavior:smooth;background:#0a0a0a}
body{color:#fafafa;overflow-x:hidden}
.mat{font-family:'Material Symbols Outlined';font-weight:normal;font-style:normal;line-height:1;letter-spacing:normal;text-transform:none;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;display:inline-block}

/* ── Colour tokens ── */
:root {
  --accent:#7c83f5;
  --accent-light:rgba(124,131,245,0.12);
  --accent-glow:rgba(124,131,245,0.25);
  --dark:#0a0a0a;
  --light:#F1F0ED;
}

/* ── Outline hero text ── */
.text-outline{-webkit-text-stroke:2.5px rgba(255,255,255,0.85);color:transparent}
.text-outline-white{-webkit-text-stroke:1px rgba(255,255,255,0.12);color:transparent}

/* ── Hero ambient blob (REMOVED ─ no glow) ── */
.hero-glow{
  display:none;
}

/* ── CSS grid lines overlay (hero) ── */
.grid-lines{
  position:absolute;inset:0;pointer-events:none;z-index:1;
  background-image:
    radial-gradient(circle,rgba(124,131,245,0.12) 1.5px,transparent 1.5px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,black 30%,transparent 100%);
}
/* ── Morphing animated status badge ── */
@keyframes morph{0%,100%{border-radius:50% 50% 50% 50%/60% 60% 40% 40%}50%{border-radius:60% 40% 60% 40%/50% 50% 50% 50%}}
.morph-badge{animation:morph 6s ease-in-out infinite}
/* ── Noise texture overlay ── */
.noise::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity:0.04;mix-blend-mode:overlay;
}

/* ── Floating glass pill nav ── */
.glass-pill{
  background:rgba(10,10,10,0.65);
  backdrop-filter:blur(24px) saturate(1.9);
  -webkit-backdrop-filter:blur(24px) saturate(1.9);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:9999px;

}

/* ── Glass dark card ── */
.glass-dark{
  background:rgba(255,255,255,0.04);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:1rem;
  padding:2rem 2.5rem;
  transition:border-color 0.4s;
}
.glass-dark:hover{border-color:rgba(124,131,245,0.4)}

/* ── Bento cards ── */
.bento-dark{background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:1.25rem;padding:2.5rem 3rem;overflow:hidden;position:relative}
.bento-light{background:#18181b;border:1px solid rgba(255,255,255,0.08);border-radius:1.25rem;padding:2.5rem 3rem;position:relative;overflow:hidden}
.bento-indigo{background:linear-gradient(135deg,#312e81,#7c83f5 50%,#a5b4fc);border-radius:1.25rem;padding:2.5rem 3rem;color:white;position:relative;overflow:hidden}

/* ── Language pill button ── */
.lang-btn{
  width:100%;display:flex;justify-content:space-between;align-items:center;
  padding:1rem 1.25rem;border-radius:0.75rem;
  background:#27272a;border:1px solid rgba(255,255,255,0.08);
  font-weight:700;font-size:1.1rem;color:#fafafa;
  cursor:pointer;transition:all 0.25s;
}
.lang-btn:hover{background:var(--accent);color:white;border-color:var(--accent)}
.lang-btn:hover .lang-arrow{opacity:1;transform:translateX(0)}
.lang-arrow{opacity:0;transform:translateX(-6px);transition:all 0.25s;font-family:'Material Symbols Outlined';font-size:1rem}

/* ── Tool pill ── */
.tool-pill{
  padding:0.6rem 1.2rem;border-radius:9999px;
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
  font-weight:600;font-size:0.9rem;color:#a1a1aa;
  transition:all 0.2s;cursor:default;
}
.tool-pill:hover{background:var(--accent);color:white;border-color:var(--accent)}

/* ── Expertise row ── */
.exp-row{
  display:flex;align-items:flex-start;gap:1rem;padding:1.25rem 1rem;
  border-radius:0.75rem;border-left:3px solid transparent;
  transition:all 0.25s;
}
.exp-row:hover{background:rgba(255,255,255,0.04);border-left-color:var(--accent)}

/* ── Project card ── */
.proj-card{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.07);
  border-radius:2.5rem;overflow:hidden;
  transition:border-color 0.5s;
}
.proj-card:hover{border-color:rgba(124,131,245,0.4)}

/* ── Marquee ── */
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.marquee-run{animation:marquee 35s linear infinite;display:inline-flex}

/* ── Floating orbs (hero bg decoration) ── */
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes pulse-ring{0%,100%{opacity:0.35;transform:scale(1)}50%{opacity:0.2;transform:scale(1.15)}}
.orb-float{animation:float 7s ease-in-out infinite}
.orb-float-slow{animation:float 11s ease-in-out infinite}
.pulse-ring{animation:pulse-ring 3s ease-in-out infinite}

/* ── Scroll bar hide ── */
::-webkit-scrollbar{width:0}
::selection{background:rgba(124,131,245,0.3)}

/* ── Footer blur row ── */
.footer-bar{
  backdrop-filter:blur(20px) saturate(1.5);
  -webkit-backdrop-filter:blur(20px) saturate(1.5);
  background:rgba(10,10,10,0.7);
  border-top:1px solid rgba(255,255,255,0.06);
}

/* ── Mobile Nav Toggle ── */
.mobile-nav-toggle{
  display:none;
  background:rgba(24,24,27,0.9);
  border:1px solid rgba(255,255,255,0.08);
  color:#fafafa;
  border-radius:50%;
  width:3rem;
  height:3rem;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  z-index:200;
  backdrop-filter:blur(10px);
}

/* ── Mobile Nav Overlay ── */
.mobile-nav-overlay{
  position:fixed;
  inset:0;
  background:rgba(9,9,11,0.97);
  backdrop-filter:blur(20px);
  z-index:150;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:2.5rem;
  padding:2rem;
}
.mobile-nav-overlay a{
  font-size:1.8rem;
  font-weight:800;
  color:#fafafa;
  text-decoration:none;
  text-transform:uppercase;
  letter-spacing:0.1em;
  transition:color 0.2s;
}
.mobile-nav-overlay a:hover{color:#7c83f5}

/* ── Responsive: Tablet ── */
@media (max-width: 1024px) {
  .hero-responsive { grid-template-columns: 1fr !important; text-align: left !important; gap: 3rem !important; padding: 6rem 3rem 4rem !important; }
  .about-responsive { grid-template-columns: 1fr !important; gap: 3rem !important; }
  .arsenal-bento { display: flex !important; flex-direction: column !important; }
  .arsenal-bento > div { grid-column: span 1 !important; }
  .field-responsive { grid-template-columns: 1fr !important; }
  .proj-card { grid-template-columns: 1fr !important; }
  .proj-card > div:first-child { aspect-ratio: 16/9 !important; }
  .footer-bar { padding: 1.25rem 3rem !important; }
}

/* ── Responsive: Mobile ── */
@media (max-width: 768px) {
  .desktop-nav-links { display: none !important; }
  .desktop-resume-btn { display: none !important; }
  .mobile-nav-toggle { display: flex !important; margin-left: auto; }
  .glass-pill { padding: 0.7rem 1rem !important; }
  
  .hero-responsive { padding: 5rem 1.5rem 3rem !important; }
  .hero-responsive h1 { font-size: clamp(3.5rem, 14vw, 5rem) !important; text-align: left !important; }
  .hero-responsive p { text-align: left !important; }
  .hero-avatar-container { width: clamp(200px, 60vw, 280px) !important; height: clamp(200px, 60vw, 280px) !important; margin: 0 auto; }
  .hero-stat-1 { display: none !important; }
  .hero-stat-2 { display: none !important; }
  .hero-ring { display: none !important; }
  
  .section-pad { padding: 4rem 1.5rem !important; }
  .section-pad h2 { font-size: clamp(2.5rem, 10vw, 3.5rem) !important; }
  .bento-dark, .bento-light, .bento-indigo { padding: 1.5rem 1.75rem !important; }
  .glass-dark { padding: 1.5rem !important; }
  .proj-card > div:last-child, .proj-card > div:nth-child(2) { padding: 2rem !important; }
  
  .marquee-section { padding: 1rem 0 !important; }
  .footer-bar { padding: 1.25rem 1.5rem !important; flex-direction: column; gap: 1rem; text-align: center; }
}
`;

/* ── FadeUp wrapper ── */
const FadeUp = ({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) => (
  <motion.div initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className} style={style}>
    {children}
  </motion.div>
);

/* ── Magnetic cursor ── */
const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isBig, setBig] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const ov = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest('a,button,.lang-btn'));
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', ov);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', ov); };
  }, []);
  return (
    <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none z-[200] mix-blend-difference hidden md:block"
      animate={{ x: pos.x - (isBig ? 28 : 16), y: pos.y - (isBig ? 28 : 16), width: isBig ? 56 : 32, height: isBig ? 56 : 32, backgroundColor: 'white' }}
      transition={{ type: 'spring', stiffness: 700, damping: 32, mass: 0.4 }} />
  );
};

/* ── Constellation SVG (About section right side) ── */
const Constellation = () => (
  <div style={{ position: 'relative', width: '100%', height: '460px' }}>
    {/* Ambient glow */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '320px', height: '320px', background: 'radial-gradient(circle,rgba(124,131,245,0.18) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 460 460">
      {/* Connector lines */}
      {[[230, 230, 110, 120], [230, 230, 350, 120], [230, 230, 60, 260], [230, 230, 400, 260], [230, 230, 150, 380], [230, 230, 310, 380]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(124,131,245,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
      ))}
      {/* Centre node */}
      <circle cx="230" cy="230" r="52" fill="rgba(124,131,245,0.12)" />
      <circle cx="230" cy="230" r="36" fill="rgba(124,131,245,0.22)" className="pulse-ring" />
      <circle cx="230" cy="230" r="24" fill="#7c83f5" />
    </svg>
    {/* Satellite labels */}
    {[
      { label: 'Machine Learning', x: '50%', y: '10%', bg: 'rgba(124,131,245,0.12)', border: 'rgba(124,131,245,0.3)', color: '#7c83f5' },
      { label: 'Cyber Security', x: '12%', y: '40%', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#a1a1aa' },
      { label: 'Deep Learning', x: '78%', y: '40%', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#a1a1aa' },
      { label: 'NLP', x: '28%', y: '76%', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#a1a1aa' },
      { label: 'Data Science', x: '60%', y: '76%', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#a1a1aa' },
    ].map((n, i) => (
      <div key={n.label} className="orb-float" style={{ position: 'absolute', left: n.x, top: n.y, transform: 'translate(-50%,-50%)', background: n.bg, border: `1px solid ${n.border}`, borderRadius: '9999px', padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: n.color, whiteSpace: 'nowrap', animationDelay: `${i * 0.9}s` }}>
        {n.label}
      </div>
    ))}
    {/* ML label */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white', fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.03em', zIndex: 10, pointerEvents: 'none' }}>ML</div>
    {/* Pill row */}
    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {['C++', 'Python', 'React.js', 'Django', 'AWS'].map(t => (
        <span key={t} style={{ padding: '0.4rem 0.9rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', fontWeight: 700, color: '#a1a1aa' }}>{t}</span>
      ))}
    </div>
  </div>
);

/* ── Floating particle dots (hero decoration) ── */
const Particles = () => {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    x: `${(i * 13 + 7) % 95}%`, y: `${(i * 17 + 5) % 90}%`,
    size: 2 + (i % 3),
    delay: i * 0.4,
    dur: 5 + (i % 6),
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {dots.map((d, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: '50%', background: 'rgba(124,131,245,0.35)' }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const ACCENT = '#7c83f5';

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 130]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{G}</style>
      <div style={{ overflowX: 'hidden' }}>
        <Cursor />

        {/* ══════════════ NAVBAR ══════════════ */}
        <header style={{ position: 'fixed', top: '1.75rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '100%', maxWidth: '46rem', padding: '0 1.5rem' }}>
          <nav className="glass-pill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 2rem' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.05em', background: `linear-gradient(135deg,#7c83f5,#a5b4fc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SG.</span>
            <div className="desktop-nav-links" style={{ display: 'flex', gap: '1.75rem', fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em' }}>
              {[['#about', 'About'], ['#arsenal', 'Arsenal'], ['#journey', 'Journey'], ['#works', 'Works'], ['#contact', 'Contact']].map(([h, l]) => (
                <a key={l} href={h} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>{l}</a>
              ))}
            </div>
            <a href="/resume.pdf" target="_blank" className="desktop-resume-btn" style={{ background: ACCENT, color: 'white', padding: '0.5rem 1.2rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { const t = e.currentTarget as HTMLElement; t.style.background = '#4338ca'; t.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.background = ACCENT; t.style.transform = ''; }}>
              Resume ↗
            </a>
            {/* Mobile Nav Toggle */}
            <button className="mobile-nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="mat">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </nav>
        </header>

        {/* ══════════════ MOBILE FULLSCREEN OVERLAY ══════════════ */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mobile-nav-overlay"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', color: '#fafafa', borderRadius: '50%', width: '3.5rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <span className="mat">close</span>
              </button>

              {[['#about', 'About'], ['#arsenal', 'Arsenal'], ['#journey', 'Journey'], ['#works', 'Works'], ['#contact', 'Contact']].map(([h, l]) => (
                <a key={l} href={h} onClick={() => setIsMobileMenuOpen(false)}>{l}</a>
              ))}
              <a href="/resume.pdf" target="_blank" style={{ background: ACCENT, color: 'white', padding: '1rem 2.5rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', marginTop: '1rem' }} onClick={() => setIsMobileMenuOpen(false)}>
                Resume ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════ HERO ══════════════ */}
        <section className="noise" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#0a0a0a', overflow: 'hidden', padding: '0' }}>
          {/* Background layers */}
          <div className="hero-glow" />
          <div className="grid-lines" />
          <Particles />

          {/* Ambient blur orbs */}
          {/* Ambient blur orbs — removed for no glow */}

          {/* Geometric ring decoration top-right */}
          <div className="hero-ring" style={{ position: 'absolute', top: '8%', right: '5%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(124,131,245,0.18)', zIndex: 1, pointerEvents: 'none' }} />
          <div className="hero-ring" style={{ position: 'absolute', top: '8%', right: '5%', width: '140px', height: '140px', margin: '30px', borderRadius: '50%', border: '1px solid rgba(124,131,245,0.12)', zIndex: 1, pointerEvents: 'none' }} />

          {/* Bottom-left cross */}
          <div style={{ position: 'absolute', bottom: '12%', left: '4%', zIndex: 1, pointerEvents: 'none', opacity: 0.3 }}>
            <div style={{ width: '30px', height: '1px', background: ACCENT, position: 'absolute', top: '50%', left: '0' }} />
            <div style={{ width: '1px', height: '30px', background: ACCENT, position: 'absolute', top: '0', left: '50%' }} />
          </div>

          {/* Split layout */}
          <motion.div className="hero-responsive" style={{ y: heroY, position: 'relative', zIndex: 2, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '8rem 6rem 5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>

            {/* Left: text */}
            <div>
              {/* Animated status badge */}
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', background: 'rgba(124,131,245,0.1)', border: '1px solid rgba(124,131,245,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem 0.4rem 0.5rem' }}>
                <span className="morph-badge" style={{ width: '0.55rem', height: '0.55rem', borderRadius: '50%', background: '#7c83f5', display: 'inline-block' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: ACCENT }}>Available for opportunities</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: 'clamp(4.5rem,10vw,9.5rem)', lineHeight: 0.82, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: '0.6rem', color: '#fafafa' }}>
                SENJUTI
              </motion.h1>
              <motion.h1 initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
                className="text-outline"
                style={{ fontSize: 'clamp(4.5rem,10vw,9.5rem)', lineHeight: 0.82, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: '2.5rem', display: 'block' }}>
                GHOSAL
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
                style={{ maxWidth: '520px' }}>
                <p style={{ fontSize: 'clamp(1rem,1.6vw,1.2rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '2.5rem', fontWeight: 400 }}>
                  M.Tech CSE @ <strong style={{ fontWeight: 700, color: '#fafafa' }}>IIIT Delhi</strong>. Building resilient ML systems and fortifying digital infrastructures at the intersection of data intelligence and cyber defense.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <a href="#works" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: ACCENT, color: 'white', padding: '0.85rem 1.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', transition: 'all 0.25s' }}
                    onMouseEnter={e => { const t = e.currentTarget as HTMLElement; t.style.background = '#4338ca'; t.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.background = ACCENT; t.style.transform = ''; }}>
                    View my work <span className="mat" style={{ fontSize: '1rem' }}>arrow_forward</span>
                  </a>
                  <a href="/resume.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { const t = e.currentTarget as HTMLElement; t.style.color = ACCENT; t.style.borderColor = ACCENT; }}
                    onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.color = 'rgba(255,255,255,0.55)'; t.style.borderColor = 'rgba(255,255,255,0.15)'; }}>
                    Resume <span className="mat" style={{ fontSize: '0.85rem' }}>open_in_new</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: illustration + floating stat cards */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', flexShrink: 0 }}>
              {/* Main illustration circle */}
              <div className="hero-avatar-container" style={{ width: 'clamp(260px,22vw,360px)', height: 'clamp(260px,22vw,360px)', borderRadius: '50%', overflow: 'hidden', background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 2 }}>
                <img src="/logo_circle.png" alt="Senjuti Ghosal" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>

              {/* Floating stat: IIIT */}
              <motion.div className="hero-stat-1" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '-1rem', right: '-3rem', background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '0.75rem 1.25rem', zIndex: 3 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '-0.02em', color: ACCENT }}>IIIT Delhi</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>M.Tech · 2025</div>
              </motion.div>

              {/* Floating stat: specialization */}
              <motion.div className="hero-stat-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', bottom: '1rem', left: '-3.5rem', background: '#0a0a0a', border: '1px solid rgba(124,131,245,0.3)', borderRadius: '1rem', padding: '0.75rem 1.25rem', zIndex: 3 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#a5b4fc' }}>ML + Security</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>Specialization</div>
              </motion.div>

              {/* Decorative ring behind */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(300px,26vw,420px)', height: 'clamp(300px,26vw,420px)', borderRadius: '50%', border: '1px dashed rgba(124,131,245,0.2)', zIndex: 1, pointerEvents: 'none' }} className="orb-float-slow" />
            </motion.div>
          </motion.div>

          {/* Scroll indicator bottom centre */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 3 }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
            <motion.div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom,' + ACCENT + ',transparent)', borderRadius: '1px' }} animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>
        </section >

        {/* ══════════════ ABOUT ══════════════ */}
        < section className="section-pad" style={{ background: '#0a0a0a', padding: '8rem 6rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }
        } id="about" >
          <div className="about-responsive" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <FadeUp>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1.5rem' }}>// Who I am</p>
              <h2 style={{ fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.75rem', color: '#fafafa' }}>
                <span style={{ fontSize: 'clamp(2.5rem,5vw,4.25rem)', display: 'block' }}>Engineering</span>
                <span style={{ fontSize: 'clamp(2.5rem,5vw,4.25rem)', display: 'block', fontStyle: 'italic', color: '#7c83f5' }}>intelligent</span>
                <span style={{ fontSize: 'clamp(2.5rem,5vw,4.25rem)', display: 'block' }}>systems.</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#a1a1aa', lineHeight: 1.8, maxWidth: '460px' }}>
                Post-Graduate student at <strong style={{ color: '#fafafa', fontWeight: 700 }}>IIIT Delhi</strong> (M.Tech CSE, 2025–Present). Deep focus on adversarial machine learning, network security, and resilient system architectures. I translate complex theoretical concepts into production-ready solutions.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Constellation />
            </FadeUp>
          </div>
        </section >

        {/* ══════════════ TECHNICAL ARSENAL ══════════════ */}
        < section className="section-pad" style={{ background: '#0a0a0a', padding: '8rem 6rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }} id="arsenal" >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <FadeUp style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: 'clamp(3.5rem,8vw,7.5rem)', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: 0.88, color: '#fafafa' }}>
                Built to<br />Engineer.
              </h2>
            </FadeUp>

            <div className="arsenal-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>

              {/* Card A — Core Expertise, dark, col-8 */}
              <FadeUp delay={0.04} style={{ gridColumn: 'span 8' }}>
                <div className="bento-dark" style={{ minHeight: '26rem' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', marginBottom: '2rem' }}>Core Expertise</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {[
                      { icon: 'smart_toy', name: 'Machine Learning', desc: 'Predictive modeling, statistical analysis, scalable algorithms for complex datasets.' },
                      { icon: 'shield_lock', name: 'Cyber Security', desc: 'Threat modeling, secure architecture design, vulnerability assessment.' },
                      { icon: 'psychology', name: 'Deep Learning', desc: 'Neural networks, CNNs, GANs, Transformers, computer vision systems.' },
                      { icon: 'forum', name: 'NLP', desc: 'Language models, sentiment analysis, context-aware text intelligence.' },
                    ].map(e => (
                      <div key={e.name} className="exp-row">
                        <span className="mat" style={{ fontSize: '1.75rem', color: ACCENT, flexShrink: 0, marginTop: '0.1rem' }}>{e.icon}</span>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.2rem' }}>{e.name}</h4>
                          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{e.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Card B — Languages, white, col-4 */}
              <FadeUp delay={0.08} style={{ gridColumn: 'span 4' }}>
                <div className="bento-light" style={{ height: '100%' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none' }}>01</div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '0.35rem', position: 'relative', zIndex: 1 }}>Languages</p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}>Primary programming arsenal.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
                    {['Python', 'C++', 'C', 'JavaScript'].map(l => (
                      <button key={l} className="lang-btn">
                        {l}
                        <span className="lang-arrow mat">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Card C — Frameworks, white, col-5 */}
              <FadeUp delay={0.1} style={{ gridColumn: 'span 5' }}>
                <div className="bento-light" style={{ height: '100%' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none' }}>02</div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '0.35rem', position: 'relative', zIndex: 1 }}>Frameworks & Tools</p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}>Libraries and ecosystems.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
                    {['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'React.js', 'Django', 'AWS', 'Docker', 'Git', 'MySQL'].map(t => (
                      <span key={t} className="tool-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Card D — Electives, indigo gradient, col-7 */}
              <FadeUp delay={0.12} style={{ gridColumn: 'span 7' }}>
                <div className="bento-indigo" style={{ height: '100%' }}>
                  <div style={{ position: 'absolute', top: '0.75rem', right: '1.5rem', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none', zIndex: 0 }}>03</div>
                  <span className="mat" style={{ fontSize: '14rem', position: 'absolute', bottom: '-3rem', right: '-3rem', opacity: 0.07, color: 'white', transform: 'rotate(-15deg)', zIndex: 0 }}>school</span>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(219,234,254,0.9)', marginBottom: '0.35rem', position: 'relative', zIndex: 1 }}>Academic Focus</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>Key areas of research & study at IIIT Delhi.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem 2rem', position: 'relative', zIndex: 1 }}>
                    {['Advanced Machine Learning', 'Deep Learning', 'Network Security', 'Foundations of Computer Security', 'Applied Cryptography', 'Data Mining', 'DBMS', 'Distributed Systems'].map(e => (
                      <div key={e} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span className="mat" style={{ fontSize: '0.85rem', color: 'white' }}>check</span>
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section >

        {/* ══════════════ THE JOURNEY ══════════════ */}
        < section className="section-pad" style={{ background: '#0a0a0a', color: 'white', padding: '8rem 6rem', position: 'relative', overflow: 'hidden' }} id="journey" >
          {/* ambient glow removed */}
          < div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <FadeUp>
              <h2 style={{ fontSize: 'clamp(3.5rem,8vw,7rem)', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '6rem' }}>The Journey</h2>
            </FadeUp>
            <div style={{ position: 'relative', borderLeft: '2px solid rgba(255,255,255,0.07)', paddingLeft: '4rem', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
              {[
                { school: 'IIIT Delhi', period: '2025 — Present', degree: 'M.Tech — Computer Science & Engineering', score: 'CGPA: 7.5', desc: 'Focus on adversarial ML, network security, and secure system protocols. Guide: Arani Bhattacharya.', active: true },
                { school: 'SRM IST', period: '2021 — 2025', degree: 'B.Tech — Computer Science & Engineering', score: 'CGPA: 9.23', desc: 'Strong foundation in algorithms, OOP, machine learning practicals, and systems programming.', active: false },
                { school: 'Burnpur Riverside', period: '2019 — 2021', degree: 'CBSE Class XII — Science', score: '92%', desc: 'Senior secondary education in Mathematics, Physics, and Computer Science.', active: false },
              ].map((e, i) => (
                <FadeUp key={e.school} delay={i * 0.12} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-4.6rem', top: '0.5rem', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: e.active ? ACCENT : 'rgba(255,255,255,0.15)', border: '3px solid #0a0a0a' }} />
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: e.active ? '#7c83f5' : 'rgba(255,255,255,0.28)', marginBottom: '0.75rem' }}>{e.period}</span>
                  <h3 style={{ fontSize: 'clamp(2.5rem,5vw,4.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'white', marginBottom: '0.5rem', lineHeight: 1 }}>{e.school}</h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>{e.degree}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.3rem 0.9rem', background: 'rgba(124,131,245,0.15)', border: '1px solid rgba(124,131,245,0.3)', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7c83f5' }}>{e.score}</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.28)' }}>{e.desc}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div >
        </section >

        {/* ══════════════ IN THE FIELD ══════════════ */}
        < section className="section-pad" style={{ background: '#0a0a0a', color: 'white', padding: '8rem 6rem', borderTop: '1px solid rgba(255,255,255,0.05)' }} id="experience" >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <FadeUp style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(3.5rem,8vw,7rem)', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>In the Field</h2>
            </FadeUp>
            <div className="field-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {[
                { tag: 'Current Role', tagColor: ACCENT, icon: 'science', role: 'Post-Graduate Researcher', org: 'IIIT Delhi', year: '2025', desc: 'Adversarial ML & network security. Deepening research on model robustness and secure protocol design. Guide: Arani Bhattacharya.' },
                { tag: 'Internship', tagColor: 'rgba(255,255,255,0.28)', icon: 'code', role: 'Research Intern', org: 'SRM Technology', year: '2024', desc: 'Built NLP-powered resume parser with React.js + Python. Streamlined recruitment workflows for the SRM placement cell.' },
                { tag: 'Gov. Internship', tagColor: 'rgba(255,255,255,0.28)', icon: 'precision_manufacturing', role: 'Industrial Intern', org: 'Eastern Coalfields Ltd.', year: '2023', desc: 'Developed OCR-based document extraction pipeline in Django for digitised archival of coal-mine operational records.' },
              ].map((e, i) => (
                <FadeUp key={e.role} delay={i * 0.1}>
                  <div className="glass-dark" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: e.tagColor, marginBottom: '1.25rem', display: 'block' }}>{e.tag}</span>
                    <span className="mat" style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.18)', marginBottom: '1rem', display: 'block' }}>{e.icon}</span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white', marginBottom: '0.35rem', lineHeight: 1.15 }}>{e.role}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', marginBottom: '1rem' }}>{e.org}</p>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.75, flex: 1 }}>{e.desc}</p>
                    <div style={{ marginTop: '1.75rem', textAlign: 'right' }}>
                      <span className="text-outline-white" style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.04em' }}>{e.year}</span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section >

        {/* ══════════════ SELECTED WORKS ══════════════ */}
        < section style={{ background: '#0a0a0a', color: 'white', padding: '8rem 6rem', borderTop: '1px solid rgba(255,255,255,0.04)' }} id="works" >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <FadeUp style={{ marginBottom: '6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
              <h2 style={{ fontSize: 'clamp(3.5rem,8vw,7rem)', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: 0.9 }}>Selected<br />Works</h2>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '4rem', height: '4px', background: ACCENT, borderRadius: '2px' }} />
                <span style={{ width: '1rem', height: '4px', background: ACCENT, opacity: 0.4, borderRadius: '2px' }} />
              </div>
            </FadeUp>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
              {[
                { num: '01', flip: false, img: '/new_project_1_illustration_gan_1772999659998.png', tags: [['Deep Learning', true], ['GANs', true], ['Python', false], ['Healthcare', false]], title: 'Skin Disease Detection GAN', desc: 'Specialized GAN synthesizing high-fidelity dermatological images to augment CNN training data, improving diagnostic accuracy for underrepresented skin conditions.' },
                { num: '02', flip: true, img: '/new_project_2_illustration_erp_1772999678258.png', tags: [['C++', true], ['Systems', true], ['Multithreading', false], ['OOP', false]], title: 'C++ Threaded ERP Platform', desc: 'High-performance university ERP leveraging multi-threading, template-based heterogeneous identifiers, and O(log n) grade queries with custom STL comparators.' },
                { num: '03', flip: false, img: '/new_project_3_illustration_ocr_1772999696396.png', tags: [['Computer Vision', true], ['NLP', true], ['Django', false], ['Python', false]], title: 'Intelligent OCR Pipeline', desc: 'End-to-end OCR pipeline combining computer vision document analysis with NLP text correction, served via a Django REST backend for automated digital archival.' },
              ].map(p => (
                <FadeUp key={p.num} delay={0.05}>
                  <div className="proj-card" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', order: p.flip ? 1 : 0, position: 'relative' }}>
                      <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.8)', transform: 'scale(1.06)', transition: 'all 1.1s ease' }}
                        onMouseEnter={e => { const t = e.currentTarget as HTMLImageElement; t.style.filter = 'grayscale(0%) brightness(1)'; t.style.transform = 'scale(1)'; }}
                        onMouseLeave={e => { const t = e.currentTarget as HTMLImageElement; t.style.filter = 'grayscale(100%) brightness(0.8)'; t.style.transform = 'scale(1.06)'; }} />
                    </div>
                    <div style={{ padding: '3.25rem 3.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', order: p.flip ? 0 : 1 }}>
                      <span style={{ position: 'absolute', top: '2rem', right: '2.5rem', fontSize: '6.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.025)', userSelect: 'none', lineHeight: 1 }}>{p.num}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                        {p.tags.map(([t, acc]) => (
                          <span key={t as string} style={{ padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', background: acc ? 'rgba(124,131,245,0.18)' : 'rgba(255,255,255,0.05)', color: acc ? '#7c83f5' : 'rgba(255,255,255,0.42)', border: acc ? '1px solid rgba(124,131,245,0.35)' : '1px solid rgba(255,255,255,0.07)' }}>{t as string}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>{p.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontSize: '0.975rem', marginBottom: '2rem' }}>{p.desc}</p>
                      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', color: '#7c83f5', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', transition: 'gap 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.gap = '1.25rem')}
                        onMouseLeave={e => (e.currentTarget.style.gap = '0.7rem')}>
                        View Case Study <span className="mat" style={{ fontSize: '1rem' }}>arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section >

        {/* ══════════════ MARQUEE ══════════════ */}
        < div className="marquee-section" style={{ background: ACCENT, padding: '1.6rem 0', overflow: 'hidden', borderTop: '1px solid rgba(79,70,229,0.4)', borderBottom: '1px solid rgba(79,70,229,0.4)' }}>
          <div className="marquee-run" style={{ whiteSpace: 'nowrap' }}>
            {['AWS Machine Learning ★', 'IBM Full Stack ★', 'Google Cybersecurity ★', 'IBM Data Science ★', 'AWS Machine Learning ★', 'IBM Full Stack ★', 'Google Cybersecurity ★', 'IBM Data Science ★'].map((c, i) => (
              <span key={i} style={{ display: 'inline-block', marginRight: '3.5rem', fontSize: 'clamp(1.4rem,3vw,2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.92)' }}>{c}</span>
            ))}
          </div>
        </div >

        {/* ══════════════ FOOTER / CONTACT ══════════════ */}
        < footer style={{ background: '#0a0a0a', color: 'white', paddingTop: '10rem', overflow: 'hidden', position: 'relative' }} id="contact" >
          {/* Ambient glow removed */}
          < div className="section-pad" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, paddingBottom: '8rem' }}>
            <FadeUp>
              <h2 style={{ fontSize: 'clamp(3rem,10vw,9.5rem)', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: 0.87, marginBottom: '4rem' }}>
                LET'S WORK<br />TOGETHER.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <a href="mailto:senjuti25085@iiitd.ac.in"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem', background: ACCENT, color: 'white', padding: '1.1rem 1.5rem 1.1rem 2.5rem', borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s' }}
                onMouseEnter={e => { const t = e.currentTarget as HTMLElement; t.style.background = '#4338ca'; t.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.background = ACCENT; t.style.transform = ''; }}>
                Get in touch
                <span style={{ width: '2.6rem', height: '2.6rem', borderRadius: '50%', background: 'white', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  <span className="mat" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
                </span>
              </a>
            </FadeUp>
          </div >

          {/* Ghost watermark */}
          < div style={{ position: 'absolute', bottom: '7rem', left: '50%', transform: 'translateX(-50%)', fontSize: '20vw', fontWeight: 900, color: 'rgba(255,255,255,0.022)', whiteSpace: 'nowrap', letterSpacing: '-0.05em', textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none', zIndex: 0, width: '100%', textAlign: 'center' }}>
            SENJUTI GHOSAL
          </div >

          {/* Footer bar — blur glass */}
          < div className="footer-bar" style={{ padding: '1.25rem 6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.05em', background: `linear-gradient(135deg,#a5b4fc,#7c83f5)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SG.</span>
            <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.28)' }}>
              {[['#', 'LinkedIn'], ['#', 'GitHub'], ['/resume.pdf', 'Resume']].map(([h, l]) => (
                <a key={l} href={h} target={l === 'Resume' ? '_blank' : undefined} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}>{l}</a>
              ))}
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.15)' }}>© {new Date().getFullYear()} SENJUTI GHOSAL — IIIT DELHI</span>
          </div >
        </footer >
      </div >
    </>
  );
}
