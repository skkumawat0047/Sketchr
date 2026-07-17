import { useNavigate } from "react-router-dom";
import {
  Users, Shapes, ArrowRight, ArrowUpRight, Layers, MessageSquare
} from "lucide-react";
import SketchrLogo from "./Login/SketchrLogo";

/**
 * Sketchr — Marketing / Landing Page
 * Split hero (text + mock board preview), alternating feature rows,
 * horizontal step cards. Kept simple: plain JSX, no scroll/observer logic.
 */

const COLORS = {
  paper: "#F7F2E9",
  ink: "#22201B",
  primary: "#F2994A",   // amber-orange accent
  secondary: "#5B5FEF", // indigo accent
  mint: "#3FBF9F",
  sun: "#FFD166",
  pencil: "#8B8478",
  line: "#EAE3D3",
};


const STEPS = [
  { n: "1", title: "Open a board", text: "One click, no template forced on you." },
  { n: "2", title: "Share the link", text: "Anyone with it can join and draw instantly." },
  { n: "3", title: "Build it out loud", text: "Ideas turn into diagrams as you talk." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <SketchrLogo size={30} />
          Sketchr
        </div>
        <div style={styles.navLinks}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#how" style={styles.navLink}>How it works</a>
          <button style={styles.navCta} onClick={() => navigate("/Login")}>Log in</button>
        </div>
      </nav>

      {/* SPLIT HERO */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.eyebrow}>a whiteboard that keeps up with your team</div>
          <h1 style={styles.heroTitle}>
            Turn scattered thoughts into a board everyone gets.
          </h1>
          <p style={styles.heroText}>
            Sketchr is where your team sketches, plans, and argues about sticky-note
            placement — all in real time, all in one place.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryButton} onClick={() => navigate("/board/new")}>
              Open a board <ArrowRight size={17} />
            </button>
            <button style={styles.ghostButton} onClick={() => navigate("/Login")}>
              I already have an account
            </button>
          </div>
          <div style={styles.statRow}>
            <div><strong>40K+</strong> boards</div>
            <div><strong>120+</strong> countries</div>
            <div><strong>99.9%</strong> uptime</div>
          </div>
        </div>

        {/* Hand-drawn mock board preview instead of floating sticky notes */}
        <div style={styles.heroRight}>
          <div style={styles.mockBoard}>
            <div style={styles.mockDot} />
            <div style={styles.mockDot2} />
            <svg width="100%" height="140" viewBox="0 0 300 140">
              <path d="M10,100 C60,20 110,120 160,50 C200,0 250,80 290,40"
                fill="none" stroke={COLORS.primary} strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div style={styles.mockNote}>ship it 🚀</div>
            <div style={styles.mockShape} />
          </div>
        </div>
      </section>

      {/* FEATURES — alternating rows */}
      <section id="features" style={styles.section}>
        <h2 style={styles.sectionTitle}>Built for how teams actually think</h2>
        {FEATURES.map((f, i) => (
          <div
          key={f.title}
            style={{
              ...styles.featureRow,
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            <div style={styles.featureText}>
              <div style={{ ...styles.featureIcon, background: f.color }}>
                <f.icon size={22} color={COLORS.ink} />
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureBody}>{f.text}</p>
            </div>
            <div style={{ ...styles.featureBlock, background: `${f.color}33` }}>
              {f.preview}
            </div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS — horizontal cards */}
      <section id="how" style={{ ...styles.section, background: "#fff" }}>
        <h2 style={styles.sectionTitle}>Three steps. That's it.</h2>
        <div style={styles.stepGrid}>
          {STEPS.map((s) => (
            <div key={s.n} style={styles.stepCard}>
              <div style={styles.stepNumber}>{s.n}</div>
              <h3 style={styles.featureTitle}>{s.title}</h3>
              <p style={styles.featureBody}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.finalTitle}>Stop explaining the idea. Draw it.</h2>
        <button style={styles.primaryButton} onClick={() => navigate("/Login")}>
          Start for free <ArrowRight size={17} />
        </button>
      </section>

      <footer style={styles.footer}>
        Sketchr — made for the whiteboard-covered wall you wish you had.
      </footer>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: COLORS.paper,
    fontFamily: "'Manrope', sans-serif",
    color: COLORS.ink,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 44px",
    borderBottom: `1.5px solid ${COLORS.ink}`,
    background: "#fff",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "28px",
  },
  navLinks: { display: "flex", alignItems: "center", gap: "26px" },
  navLink: { textDecoration: "none", color: COLORS.pencil, fontSize: "14.5px" },
  navCta: {
    background: COLORS.ink,
    color: "#fff",
    border: "none",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "14px",
    padding: "9px 18px",
    cursor: "pointer",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    padding: "70px 44px",
    flexWrap: "wrap",
  },
  heroLeft: { flex: "1 1 420px" },
  heroRight: { flex: "1 1 320px", display: "flex", justifyContent: "center" },
  eyebrow: {
    display: "inline-block",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "13px",
    color: COLORS.secondary,
    border: `1.5px dashed ${COLORS.secondary}`,
    padding: "6px 14px",
    marginBottom: "20px",
  },
  heroTitle: {
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "50px",
    lineHeight: 1.1,
    margin: "0 0 18px",
  },
  heroText: {
    fontSize: "16px",
    color: COLORS.pencil,
    lineHeight: 1.6,
    maxWidth: "460px",
    marginBottom: "28px",
  },
  heroButtons: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "26px" },
  primaryButton: {
    background: COLORS.primary,
    color: COLORS.ink,
    border: `1.5px solid ${COLORS.ink}`,
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "16px",
    padding: "13px 24px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    boxShadow: "4px 4px 0 rgba(34,32,27,0.85)",
  },
  ghostButton: {
    background: "transparent",
    border: "none",
    color: COLORS.ink,
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "15px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  statRow: {
    display: "flex",
    gap: "26px",
    fontSize: "13.5px",
    color: COLORS.pencil,
    flexWrap: "wrap",
  },
  mockBoard: {
    position: "relative",
    width: "320px",
    height: "260px",
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    padding: "20px",
    boxShadow: "6px 6px 0 rgba(34,32,27,0.85)",
  },
  mockDot: {
    position: "absolute", top: "14px", left: "14px",
    width: "10px", height: "10px", borderRadius: "50%", background: COLORS.primary,
  },
  mockDot2: {
    position: "absolute", top: "14px", left: "30px",
    width: "10px", height: "10px", borderRadius: "50%", background: COLORS.mint,
  },
  mockNote: {
    position: "absolute",
    bottom: "50px",
    left: "24px",
    background: COLORS.sun,
    padding: "8px 12px",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "13px",
    transform: "rotate(-4deg)",
    boxShadow: "2px 3px 6px rgba(0,0,0,0.15)",
  },
  mockShape: {
    position: "absolute",
    bottom: "24px",
    right: "24px",
    width: "50px",
    height: "36px",
    border: `2.5px solid ${COLORS.secondary}`,
    borderRadius: "6px",
  },
  section: { padding: "80px 44px", maxWidth: "1000px", margin: "0 auto" },
  sectionTitle: {
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "38px",
    textAlign: "center",
    marginBottom: "50px",
  },
  featureRow: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    marginBottom: "50px",
    flexWrap: "wrap",
  },
  featureText: { flex: "1 1 300px" },
  featureIcon: {
    width: "44px", height: "44px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "14px", border: `1.5px solid ${COLORS.ink}`,
  },
  featureTitle: { fontFamily: "'Architects Daughter', cursive", fontSize: "19px", margin: "0 0 8px" },
  featureBody: { fontSize: "14.5px", color: COLORS.pencil, lineHeight: 1.6, maxWidth: "380px" },
  featureBlock: {
    flex: "1 1 260px",
    height: "160px",
    border: `1.5px dashed ${COLORS.ink}`,
    padding: "16px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  // Small circle with a letter in it — used to represent a person's cursor
  cursorDot: {
    position: "absolute",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "13px",
    border: `2px solid ${COLORS.ink}`,
  },
  // Row that holds the circle / square / triangle shapes
  shapeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    height: "100%",
  },
  // 4x4 grid of dots, used inside the "infinite canvas" preview
  dotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    width: "100px",
    margin: "0 auto",
    paddingTop: "20px",
  },
  gridDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: COLORS.ink,
    opacity: 0.5,
  },
  // Speech-bubble box used in the "comments" feature preview
  speechBubble: {
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    borderRadius: "14px",
    padding: "10px 16px",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "14px",
    position: "relative",
  },
  stepGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  stepCard: {
    background: COLORS.paper,
    border: `1.5px solid ${COLORS.ink}`,
    padding: "26px",
  },
  stepNumber: {
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "44px",
    color: COLORS.primary,
    marginBottom: "8px",
  },
  finalCta: { textAlign: "center", padding: "90px 24px" },
  finalTitle: { fontFamily: "'Gochi Hand', cursive", fontSize: "40px", marginBottom: "24px" },
  footer: {
    textAlign: "center",
    padding: "24px",
    fontSize: "13px",
    color: COLORS.pencil,
    borderTop: `1.5px solid ${COLORS.line}`,
  },
};
  const FEATURES = [
    {
      icon: Users,
      title: "Draw together, live",
      text: "Everyone's cursor, everyone's strokes, on the same board — no refreshing, no waiting.",
      color: COLORS.mint,
      // Three little "cursor" dots to represent multiple people on one board
      preview: (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div style={{ ...styles.cursorDot, top: "30%", left: "25%", background: COLORS.primary }}>A</div>
          <div style={{ ...styles.cursorDot, top: "55%", left: "50%", background: COLORS.secondary }}>B</div>
          <div style={{ ...styles.cursorDot, top: "35%", left: "70%", background: COLORS.sun }}>C</div>
        </div>
      ),
    },
    {
      icon: Shapes,
      title: "Shapes that keep up with you",
      text: "Freehand, arrows, sticky notes, frames — reach for whatever your idea needs.",
      color: COLORS.primary,
      // A circle, a square, and a triangle to represent the drawing toolkit
      preview: (
        <div style={styles.shapeRow}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", border: `3px solid ${COLORS.ink}` }} />
          <div style={{ width: 46, height: 46, border: `3px solid ${COLORS.ink}` }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: "23px solid transparent",
            borderRight: "23px solid transparent",
            borderBottom: `40px solid ${COLORS.ink}`,
          }} />
        </div>
      ),
    },
    {
      icon: Layers,
      title: "A canvas with no edges",
      text: "Zoom out for the big picture, zoom in for the detail. The board grows with you.",
      color: COLORS.secondary,
      // A dot grid with corner arrows to suggest an endless, zoomable canvas
      preview: (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div style={styles.dotGrid}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={styles.gridDot} />
            ))}
          </div>
          <ArrowUpRight size={18} style={{ position: "absolute", top: 6, right: 6 }} />
          <ArrowUpRight size={18} style={{ position: "absolute", bottom: 6, left: 6, transform: "rotate(180deg)" }} />
        </div>
      ),
    },
    {
      icon: MessageSquare,
      title: "Comments, right on the board",
      text: "Leave a note next to the thing it's about, tag a teammate, keep moving.",
      color: COLORS.sun,
      // A speech-bubble shape to represent leaving a comment on the board
      preview: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <div style={styles.speechBubble}>Nice one!</div>
        </div>
      ),
    },
  ];