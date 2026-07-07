import { useNavigate } from "react-router-dom";
import {
  Users, Infinity as InfinityIcon, Shapes, Zap, Cloud,
  ArrowRight, Star, MousePointer2, PenTool, Share2
} from "lucide-react";
import SketchrLogo from "./Login/SketchrLogo";

/**
 * Sketchr — Marketing / Landing Page
 * Sketch-paper world: cream dotted canvas, marker-red accent, hand-drawn borders.
 * Kept simple: only useNavigate from react-router. No scroll-listeners,
 * no IntersectionObserver, no manual smooth-scroll — just plain JSX + CSS.
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
    text: "Work together with your team on the same board. Watch cursors move and shapes appear live.",
    color: COLORS.teal,
  },
  {
    icon: Shapes,
    title: "Rich drawing tools",
    text: "From perfect shapes to freehand scribbles and sticky notes — bring exactly what's in your head onto the board.",
    color: COLORS.coral,
  },
  {
    icon: InfinityIcon,
    title: "Infinite canvas",
    text: "No more running out of space. Pan, zoom, and stretch your ideas as far as they need to go.",
    color: COLORS.yellow,
  },
  {
    icon: Zap,
    title: "Blazing fast",
    text: "No lag, just flow. Even with thousands of shapes, the board stays smooth.",
    color: "#B7A6FF",
  },
  {
    icon: Cloud,
    title: "Auto-saved, always",
    text: "Every stroke is saved to the cloud instantly. Your board is always exactly as you left it.",
    color: "#7FD1C4",
  },
  {
    icon: Share2,
    title: "One-click sharing",
    text: "Create a link, send it, and you're working. Passwords and permissions in your control.",
    color: "#FFB4A2",
  },
];

const STEPS = [
  { n: "01", title: "Create a new board", text: "A blank canvas ready in one click — no setup needed." },
  { n: "02", title: "Invite your team", text: "Share a link and everyone can start drawing together." },
  { n: "03", title: "Bring ideas to life", text: "From a rough scribble to a polished diagram, in real time." },
];

const STATS = [
  { value: "40K+", label: "boards created" },
  { value: "120+", label: "countries using it" },
  { value: "99.9%", label: "uptime, no interruptions" },
];

// Small reusable sticky-note component. Just plain props, no logic.
function StickyNote({ rotate, top, left, right, bottom, color, children }) {
  return (
    <div
      className="sticky-note"
      style={{ top, left, right, bottom, background: color, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

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
          background: rgba(251,248,241,0.92);
          border-bottom: 1.5px solid ${COLORS.ink};
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
        .nav-links a:hover { color: ${COLORS.coral}; }

        .nav-cta {
          background: ${COLORS.ink};
          color: ${COLORS.paper};
          border: 1.5px solid ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 14.5px;
          padding: 8px 18px;
          cursor: pointer;
        }
        .nav-cta:hover { background: ${COLORS.coral}; color: ${COLORS.ink}; }

        @media (max-width: 680px) { .nav-links a:not(.nav-cta) { display: none; } }

        /* HERO */
        .hero {
          position: relative;
          padding: 70px 24px 110px;
          text-align: center;
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
        }
        @media (max-width: 900px) { .sticky-note { display: none; } }

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
        }
        .btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 rgba(31,27,22,0.9); }

        .btn-ghost {
          background: transparent;
          border: 1.5px dashed ${COLORS.ink};
          color: ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 17px;
          padding: 14px 26px;
          cursor: pointer;
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

        .section { padding: 90px 24px; max-width: 1080px; margin: 0 auto; }
        .section-head { text-align: center; margin-bottom: 50px; }
        .section-head h2 { font-family: 'Caveat', cursive; font-weight: 700; font-size: clamp(32px, 5vw, 46px); margin: 0 0 10px; }
        .section-head p { color: ${COLORS.pencil}; font-size: 15px; }

        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 26px; }
        .feature-card {
          background: #fff;
          border: 1.5px solid ${COLORS.ink};
          padding: 26px 24px;
          box-shadow: 5px 5px 0 rgba(31,27,22,0.85);
        }
        .feature-card:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 rgba(31,27,22,0.85); }
        .feature-icon {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; border: 1.5px solid ${COLORS.ink};
        }
        .feature-card h3 { font-family: 'Kalam', cursive; font-size: 19px; margin: 0 0 8px; }
        .feature-card p { font-size: 14px; color: ${COLORS.pencil}; line-height: 1.55; margin: 0; }

        .steps { display: flex; flex-direction: column; }
        .step-row { display: flex; align-items: flex-start; gap: 24px; padding: 28px 0; border-bottom: 1.5px dashed ${COLORS.line}; }
        .step-row:last-child { border-bottom: none; }
        .step-num { font-family: 'Caveat', cursive; font-weight: 700; font-size: 46px; color: ${COLORS.coral}; width: 70px; flex-shrink: 0; }
        .step-row h3 { font-family: 'Kalam', cursive; font-size: 19px; margin: 4px 0 6px; }
        .step-row p { font-size: 14.5px; color: ${COLORS.pencil}; margin: 0; max-width: 500px; }

        .why {
          background: ${COLORS.ink};
          color: ${COLORS.paper};
          padding: 70px 30px;
          text-align: center;
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

      {/* NAVBAR */}
      <nav className="nav">
        <div className="brand">
          <SketchrLogo size={32} />
          Sketchr
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How to Use</a>
          <a onClick={() => navigate("/Login")} className="nav-cta">Log in</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <StickyNote top="8%" left="4%" rotate={-8} color={COLORS.yellow}>
          <MousePointer2 size={14} style={{ marginBottom: 4 }} /> live cursors, real people
        </StickyNote>
        <StickyNote top="14%" right="5%" rotate={7} color="#CFEFEC">
          <InfinityIcon size={14} style={{ marginBottom: 4 }} /> space that never runs out
        </StickyNote>
        <StickyNote bottom="6%" left="7%" rotate={5} color="#FFD9D3">
          <PenTool size={14} style={{ marginBottom: 4 }} /> grab a marker, get going
        </StickyNote>

        <div className="eyebrow"><SketchrLogo size={16} /> whiteboarding, reimagined</div>

        <h1>
          Where the idea in your head{" "}
          <span className="underline-svg">
            hits the board
            <svg viewBox="0 0 260 16" preserveAspectRatio="none">
              <path d="M4,10 C60,2 120,14 180,6 C210,2 235,9 256,7" />
            </svg>
          </span>{" "}
          first.
        </h1>

        <p className="lede">
          Sketchr is an infinite whiteboard where brainstorming, diagramming, and team
          collaboration happen in one place, in real time. No setup, no learning curve.
        </p>

        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => navigate("/Home")}>
            Start for free <ArrowRight size={17} />
          </button>
          <button className="btn-ghost">View live demo</button>
        </div>

        <div className="trust-line">
          <span className="stars">
            <Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
          </span>
          40,000+ teams already made this their primary whiteboard
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="value">{s.value}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-head">
          <h2>Everything, in one board.</h2>
          <p>Simple tools, taped together into one beautiful whiteboard.</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.color }}>
                <f.icon size={20} color={COLORS.ink} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-head">
          <h2>How it works</h2>
          <p>Three steps, and your team is drawing live.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step-row" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SKETCHR */}
      <section className="why">
        <h2>Why Sketchr?</h2>
        <p>
          Other tools are either boring or overcomplicated. Sketchr solves both problems —
          simple, yet powerful.
        </p>
        <div className="why-points">
          <div className="why-point"><span className="dot" /> No setup, no learning curve</div>
          <div className="why-point"><span className="dot" /> Smooth on every device</div>
          <div className="why-point"><span className="dot" /> Your data, always safe and synced</div>
          <div className="why-point"><span className="dot" /> Full power, even on the free plan</div>
        </div>
        <button className="btn-primary" onClick={() => navigate("/Login")}>
          Try it now, completely free <ArrowRight size={17} />
        </button>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Your first board, in two minutes.</h2>
        <p>Sign up, create a board, invite your team — that's all it takes.</p>
        <button className="btn-primary" onClick={() => navigate("/Login")}>
          Create a free account <ArrowRight size={17} />
        </button>
      </section>

      <footer className="foot">
        © {new Date().getFullYear()} Sketchr — where great ideas get scribbled first.
      </footer>
    </div>
  );
}