import { useState, useRef, useEffect } from "react";
import {
  Users, Infinity as InfinityIcon, Shapes, Zap, Cloud,
  ArrowRight, Star, MousePointer2, PenTool, Share2
} from "lucide-react";
import SketchrLogo from "../Login/SketchrLogo";

/**
 * Sketchr — Marketing / Landing Page
 * Sketch-paper world: cream dotted canvas, marker-red accent, hand-drawn borders.
 * Strong implementations:
 *  - Sticky nav that gains a border/shadow once the page scrolls
 *  - Smooth-scroll to in-page anchors with correct scroll offset
 *  - Scroll-reveal for feature cards & steps via IntersectionObserver, respecting reduced motion
 */

const COLORS = {
  paper: "#FBF8F1",
  ink: "#1F1B16",
  coral: "#FF6B5E",
  teal: "#4FB6B0",
  yellow: "#F6C744",
  pencil: "#8A8478",
  line: "#E7E1D3",
};

const FEATURES = [
  {
    icon: Users,
    title: "Real-time collaboration",
    text: "Apni team ke saath ek hi board pe kaam karo. Cursor move hote dekho, shapes live banti dekho — jaise sab ek hi table pe baithe ho.",
    color: COLORS.teal,
  },
  {
    icon: Shapes,
    title: "Rich drawing tools",
    text: "Perfect shapes se lekar freehand scribbles aur sticky notes tak — jo dimaag mein hai, wahi board pe utaaro, bina kisi rukawat ke.",
    color: COLORS.coral,
  },
  {
    icon: InfinityIcon,
    title: "Infinite canvas",
    text: "Space ki tension khatam. Jitna chaho pan karo, zoom karo, apne ideas ko jitna failana ho failao — board kabhi khatam nahi hota.",
    color: COLORS.yellow,
  },
  {
    icon: Zap,
    title: "Blazing fast",
    text: "Lag nahi, sirf flow. Hazaaron shapes ke saath bhi board utni hi smooth chalti hai jitni pehle stroke pe thi.",
    color: "#B7A6FF",
  },
  {
    icon: Cloud,
    title: "Auto-saved, always",
    text: "Har stroke cloud pe save hota hai turant. Tab band karo, laptop badlo, board waisi hi milegi jaisi chhodi thi.",
    color: "#7FD1C4",
  },
  {
    icon: Share2,
    title: "One-click sharing",
    text: "Ek link banao, bhejo, kaam shuru. Password, permission, sab kuch tumhare control mein.",
    color: "#FFB4A2",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Naya board banao",
    text: "Ek click mein blank canvas taiyaar — koi setup, koi template force nahi.",
  },
  {
    n: "02",
    title: "Team ko invite karo",
    text: "Link share karo aur sab ek saath drawing, planning, brainstorming shuru kar sakte hain.",
  },
  {
    n: "03",
    title: "Ideas ko zinda karo",
    text: "Scribble se lekar polished diagram tak — sab kuch ek hi jagah, real time mein.",
  },
];

const STATS = [
  { value: "40K+", label: "boards banaye gaye" },
  { value: "120+", label: "countries mein use" },
  { value: "99.9%", label: "uptime, bina rukawat" },
];

function StickyNote({ rotate, top, left, right, bottom, color, children, delay }) {
  return (
    <div
      className="sticky-note"
      style={{ top, left, right, bottom, background: color, animationDelay: `${delay}s`, "--r": `${rotate}deg` }}
    >
      {children}
    </div>
  );
}

/** Fades an element in once it scrolls into view. Respects prefers-reduced-motion. */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function RevealCard({ as: As = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <As
      ref={ref}
      className={`${className} reveal ${visible ? "reveal-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  );
}

export default function LandingPage({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .page {
          width: 100%;
          background-color: ${COLORS.paper};
          background-image: radial-gradient(${COLORS.line} 1.4px, transparent 1.4px);
          background-size: 22px 22px;
          font-family: 'Inter', sans-serif;
          color: ${COLORS.ink};
          overflow-x: hidden;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 44px;
          position: sticky;
          top: 0;
          z-index: 20;
          background: ${scrolled ? "rgba(251,248,241,0.92)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(6px)" : "none"};
          border-bottom: 1.5px solid ${scrolled ? COLORS.ink : "transparent"};
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: 28px;
        }

        .nav-links { display: flex; gap: 28px; font-size: 14.5px; color: ${COLORS.pencil}; align-items: center; }
        .nav-links a { text-decoration: none; color: inherit; cursor: pointer; }
        .nav-links a:hover { color: ${COLORS.ink}; }

        .nav-cta {
          background: ${COLORS.ink};
          color: ${COLORS.paper};
          border: 1.5px solid ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 14.5px;
          padding: 8px 18px;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .nav-cta:hover { transform: translate(-2px,-2px); box-shadow: 3px 3px 0 rgba(31,27,22,0.85); }

        @media (max-width: 680px) { .nav-links a:not(.nav-cta) { display: none; } }

        /* reveal-on-scroll */
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none; }
        }

        /* HERO */
        .hero {
          position: relative;
          padding: 70px 24px 110px;
          text-align: center;
          overflow: visible;
        }

        .sticky-note {
          position: absolute;
          width: 132px;
          padding: 14px 14px 20px;
          font-family: 'Kalam', cursive;
          font-size: 13px;
          line-height: 1.35;
          color: ${COLORS.ink};
          box-shadow: 3px 6px 14px rgba(31,27,22,0.15);
          animation: float 6s ease-in-out infinite;
          z-index: 1;
          transform: rotate(var(--r, 0deg));
        }
        @keyframes float {
          0%, 100% { transform: rotate(var(--r,0deg)) translateY(0); }
          50% { transform: rotate(var(--r,0deg)) translateY(-9px); }
        }
        .sticky-note::before {
          content: '';
          position: absolute; top: -8px; left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 34px; height: 14px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(0,0,0,0.05);
        }
        @media (max-width: 900px) { .sticky-note { display: none; } }
        @media (prefers-reduced-motion: reduce) { .sticky-note { animation: none; } }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Kalam', cursive;
          font-size: 14px;
          border: 1.5px dashed ${COLORS.ink};
          padding: 6px 14px;
          margin-bottom: 26px;
          background: #fff;
        }

        .hero h1 {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: clamp(42px, 7vw, 74px);
          line-height: 1.05;
          margin: 0 auto 20px;
          max-width: 780px;
          position: relative;
        }

        .underline-svg { position: relative; display: inline-block; }
        .underline-svg svg { position: absolute; left: 0; right: 0; bottom: -10px; width: 100%; height: 16px; }
        .underline-svg path { fill: none; stroke: ${COLORS.yellow}; stroke-width: 8; stroke-linecap: round; }

        .hero .lede {
          max-width: 560px;
          margin: 0 auto 34px;
          color: ${COLORS.pencil};
          font-size: 16.5px;
          line-height: 1.6;
        }

        .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 18px; }

        .btn-primary {
          position: relative;
          background: ${COLORS.coral};
          color: ${COLORS.ink};
          border: 1.5px solid ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 17px;
          padding: 14px 26px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 4px 4px 0 rgba(31,27,22,0.9);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 rgba(31,27,22,0.9); }
        .btn-primary:active { transform: translate(0,0); box-shadow: 2px 2px 0 rgba(31,27,22,0.9); }

        .btn-ghost {
          background: transparent;
          border: 1.5px dashed ${COLORS.ink};
          color: ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 17px;
          padding: 14px 26px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .btn-ghost:hover { background: #fff; }

        .trust-line { font-size: 13px; color: ${COLORS.pencil}; font-family: 'Kalam', cursive; }
        .stars { color: ${COLORS.yellow}; display:inline-flex; gap:2px; vertical-align: -2px; margin-right:6px; }

        .stats {
          display: flex; justify-content: center; gap: 60px; flex-wrap: wrap;
          padding: 30px 24px;
          border-top: 1.5px solid ${COLORS.ink};
          border-bottom: 1.5px solid ${COLORS.ink};
          background: #fff;
        }
        .stat { text-align: center; }
        .stat .value { font-family: 'Caveat', cursive; font-weight: 700; font-size: 40px; color: ${COLORS.coral}; line-height: 1; }
        .stat .label { font-size: 13px; color: ${COLORS.pencil}; margin-top: 4px; font-family: 'Kalam', cursive; }

        .section { padding: 90px 24px; max-width: 1080px; margin: 0 auto; scroll-margin-top: 84px; }
        .section-head { text-align: center; margin-bottom: 50px; }
        .section-head h2 { font-family: 'Caveat', cursive; font-weight: 700; font-size: clamp(32px, 5vw, 46px); margin: 0 0 10px; }
        .section-head p { color: ${COLORS.pencil}; font-size: 15px; }

        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 26px; }
        .feature-card {
          background: #fff;
          border: 1.5px solid ${COLORS.ink};
          padding: 26px 24px;
          position: relative;
          box-shadow: 5px 5px 0 rgba(31,27,22,0.85);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .feature-card:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 rgba(31,27,22,0.85); }
        .feature-icon {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; border: 1.5px solid ${COLORS.ink};
        }
        .feature-card h3 { font-family: 'Kalam', cursive; font-size: 19px; margin: 0 0 8px; }
        .feature-card p { font-size: 14px; color: ${COLORS.pencil}; line-height: 1.55; margin: 0; }

        .steps { display: flex; flex-direction: column; gap: 0; position: relative; }
        .step-row { display: flex; align-items: flex-start; gap: 24px; padding: 28px 0; border-bottom: 1.5px dashed ${COLORS.line}; }
        .step-row:last-child { border-bottom: none; }
        .step-num { font-family: 'Caveat', cursive; font-weight: 700; font-size: 46px; color: ${COLORS.coral}; width: 70px; flex-shrink: 0; }
        .step-row h3 { font-family: 'Kalam', cursive; font-size: 19px; margin: 4px 0 6px; }
        .step-row p { font-size: 14.5px; color: ${COLORS.pencil}; margin: 0; max-width: 500px; }

        .why {
          position: relative;
          background: ${COLORS.ink};
          color: ${COLORS.paper};
          padding: 70px 30px;
          text-align: center;
          border-top: 2px solid ${COLORS.ink};
          border-bottom: 2px solid ${COLORS.ink};
        }
        .why h2 { font-family: 'Caveat', cursive; font-weight: 700; font-size: clamp(30px, 5vw, 44px); margin: 0 0 14px; }
        .why p { max-width: 560px; margin: 0 auto 30px; color: #D8D2C4; font-size: 15.5px; line-height: 1.6; }
        .why-points { display: flex; gap: 34px; justify-content: center; flex-wrap: wrap; margin-bottom: 34px; }
        .why-point { display: flex; align-items: center; gap: 8px; font-family: 'Kalam', cursive; font-size: 14.5px; }
        .why-point .dot { width: 8px; height: 8px; border-radius: 50%; background: ${COLORS.coral}; }
        .why .btn-primary { background: ${COLORS.coral}; color: ${COLORS.ink}; border-color: ${COLORS.paper}; }

        .final-cta { text-align: center; padding: 90px 24px 70px; }
        .final-cta h2 { font-family: 'Caveat', cursive; font-weight: 700; font-size: clamp(30px, 5vw, 44px); margin: 0 0 16px; }
        .final-cta p { color: ${COLORS.pencil}; margin: 0 0 28px; }

        .foot { text-align: center; padding: 24px; font-size: 13px; color: ${COLORS.pencil}; border-top: 1.5px solid ${COLORS.line}; }
      `}</style>

      <nav className="nav">
        <div className="brand">
          <SketchrLogo size={32} />
          Sketchr
        </div>
        <div className="nav-links">
          <a href="#features" onClick={(e) => handleAnchorClick(e, "features")}>Features</a>
          <a href="#how" onClick={(e) => handleAnchorClick(e, "how")}>How to Use</a>
          <a onClick={onGetStarted} className="nav-cta">Log in</a>
        </div>
      </nav>

      <section className="hero">
        <StickyNote top="8%" left="4%" rotate={-8} color={COLORS.yellow} delay={0}>
          <MousePointer2 size={14} style={{ marginBottom: 4 }} /> live cursors, real people
        </StickyNote>
        <StickyNote top="14%" right="5%" rotate={7} color="#CFEFEC" delay={1.2}>
          <InfinityIcon size={14} style={{ marginBottom: 4 }} /> space jo kabhi khatam nahi hota
        </StickyNote>
        <StickyNote bottom="6%" left="7%" rotate={5} color="#FFD9D3" delay={0.6}>
          <PenTool size={14} style={{ marginBottom: 4 }} /> marker uthao, ban jao
        </StickyNote>

        <div className="eyebrow"><SketchrLogo size={16} /> whiteboarding, reimagined</div>

        <h1>
          Jo idea dimaag mein hai,{" "}
          <span className="underline-svg">
            wahi board pe
            <svg viewBox="0 0 260 16" preserveAspectRatio="none">
              <path d="M4,10 C60,2 120,14 180,6 C210,2 235,9 256,7" />
            </svg>
          </span>{" "}
          utaaro.
        </h1>

        <p className="lede">
          Sketchr ek infinite whiteboard hai jahan brainstorming, diagramming aur team collaboration
          ek hi jagah, real time mein hoti hai. Setup nahi, seekhna nahi — bas marker uthao aur shuru ho jao.
        </p>

        <div className="hero-ctas">
          <button className="btn-primary" onClick={onGetStarted}>
            Free mein shuru karo <ArrowRight size={17} />
          </button>
          <button className="btn-ghost">Live demo dekho</button>
        </div>

        <div className="trust-line">
          <span className="stars">
            <Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
          </span>
          40,000+ teams already ise apna primary whiteboard bana chuki hain
        </div>
      </section>

      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="value">{s.value}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="section" id="features">
        <RevealCard as="div" className="section-head">
          <h2>Sab kuch ek hi board mein.</h2>
          <p>Simple tools, jo taped together hain ek beautiful whiteboard mein.</p>
        </RevealCard>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <RevealCard as="div" className="feature-card" key={f.title} delay={i * 70}>
              <div className="feature-icon" style={{ background: f.color }}>
                <f.icon size={20} color={COLORS.ink} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <RevealCard as="div" className="section-head">
          <h2>Kaise kaam karta hai</h2>
          <p>Teen steps, aur tumhari team live drawing kar rahi hoti hai.</p>
        </RevealCard>
        <div className="steps">
          {STEPS.map((s, i) => (
            <RevealCard as="div" className="step-row" key={s.n} delay={i * 90}>
              <div className="step-num">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="why">
        <h2>Sketchr hi kyun?</h2>
        <p>
          Doosre tools ya to boring hain ya complicated. Sketchr dono problems solve karta hai —
          simple bhi, powerful bhi. Yahi wajah hai teams isko switch karke wapas nahi jaatin.
        </p>
        <div className="why-points">
          <div className="why-point"><span className="dot" /> No setup, no learning curve</div>
          <div className="why-point"><span className="dot" /> Har device pe smooth</div>
          <div className="why-point"><span className="dot" /> Data hamesha safe aur synced</div>
          <div className="why-point"><span className="dot" /> Free plan mein bhi full power</div>
        </div>
        <button className="btn-primary" onClick={onGetStarted}>
          Ab try karo, bilkul free <ArrowRight size={17} />
        </button>
      </section>

      <section className="final-cta">
        <h2>Apna pehla board, do minute mein.</h2>
        <p>Sign up karo, board banao, team ko bulao — bas itna hi karna hai.</p>
        <button className="btn-primary" onClick={onGetStarted}>
          Free mein account banao <ArrowRight size={17} />
        </button>
      </section>

      <footer className="foot">
        © {new Date().getFullYear()} Sketchr — jahan ideas sabse pehle scribble hoti hain.
      </footer>
    </div>
  );
}