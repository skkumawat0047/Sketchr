import { useState, useRef, useEffect, useMemo } from "react";
import { Eye, EyeOff, ArrowRight, Users, Infinity as InfinityIcon, Loader2, AlertCircle } from "lucide-react";
import SketchrLogo from "./SketchrLogo";

/**
 * Sketchr — Login
 * Sketch-paper world: cream dotted canvas, marker border card, sticky notes.
 * Strong implementations:
 *  - Real email/password validation with inline error messages
 *  - Password strength meter (visual + label)
 *  - Async submit simulation with loading state + disabled controls
 *  - Shake feedback on failed validation, aria-live error region for a11y
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Kamzor", "Theek-thaak", "Achhi", "Mazboot"];
  return { score, label: score === 0 ? "Kamzor" : labels[Math.min(score - 1, 3)] };
}

function StickyNote({ rotate, top, left, right, bottom, color, children, delay }) {
  return (
    <div
      className="sticky-note"
      style={{
        top, left, right, bottom,
        transform: `rotate(${rotate}deg)`,
        background: color,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const pathRef = useRef(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const errors = useMemo(() => {
    const e = {};
    if (!email) e.email = "Enter Email please...";
    else if (!EMAIL_RE.test(email)) e.email = "Sahi email format daalo, jaise you@studio.com.";

    if (!password) e.password = "Enter Password please...";
    else if (password.length < 8) e.password = "Password must be minimum of 8 characters.";

    return e;
  }, [email, password]);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const hasErrors = Object.keys(errors).length > 0;

  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    setTouched({ email: true, password: true });

    if (hasErrors) {
      setShake(true);
      setTimeout(() => setShake(false), 420);
      return;
    }

    setSubmitting(true);
    // Simulated async auth call
    setTimeout(() => {
      setSubmitting(false);
      // setSubmitError("Ye sirf ek demo hai — koi backend jud a nahi hai abhi.");
      setSubmitError("It is only deomo.");
    }, 1400);
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Kalam:wght@400;700&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .page {
          min-height: 100vh;
          width: 100%;
          background-color: ${COLORS.paper};
          background-image: radial-gradient(${COLORS.line} 1.4px, transparent 1.4px);
          background-size: 22px 22px;
          font-family: 'Inter', sans-serif;
          color: ${COLORS.ink};
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 40px;
          position: relative;
          z-index: 5;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: 28px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          font-size: 14.5px;
          color: ${COLORS.pencil};
        }

        .nav-links a { text-decoration: none; color: inherit; }
        .nav-links a:hover { color: ${COLORS.ink}; }

        @media (max-width: 640px) {
          .nav-links { display: none; }
        }

        .stage {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
        }

        .sticky-note {
          position: absolute;
          width: 128px;
          padding: 14px 14px 20px;
          font-family: 'Kalam', cursive;
          font-size: 13px;
          line-height: 1.35;
          color: ${COLORS.ink};
          box-shadow: 3px 6px 14px rgba(31,27,22,0.15);
          animation: float 6s ease-in-out infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-9px) rotate(var(--r, 0deg)); }
        }

        .sticky-note::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 34px;
          height: 14px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(0,0,0,0.05);
        }

        @media (max-width: 900px) {
          .sticky-note { display: none; }
        }

        .card-wrap {
          position: relative;
          width: 420px;
          max-width: 100%;
          z-index: 3;
        }

        .card-wrap.shake { animation: shake 0.42s ease; }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }

        .marker-frame {
          position: absolute;
          inset: -14px;
          pointer-events: none;
          z-index: 4;
        }

        .marker-frame path {
          fill: none;
          stroke: ${COLORS.coral};
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: ${pathLen};
          stroke-dashoffset: ${pathLen};
          animation: draw-border 1.4s ease-out forwards 0.2s;
        }

        @keyframes draw-border {
          to { stroke-dashoffset: 0; }
        }

        .card {
          background: #fff;
          border: 1.5px solid ${COLORS.ink};
          padding: 40px 38px 34px;
          position: relative;
          box-shadow: 6px 6px 0 rgba(31,27,22,0.9);
        }

        .card-pin {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${COLORS.coral};
          border: 2px solid ${COLORS.ink};
        }

        .card h1 {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: 40px;
          margin: 6px 0 2px;
          line-height: 1;
        }

        .card .sub {
          color: ${COLORS.pencil};
          font-size: 14px;
          margin-bottom: 26px;
        }

        .field {
          margin-bottom: 18px;
          position: relative;
        }

        .field label {
          display: block;
          font-family: 'Kalam', cursive;
          font-size: 13.5px;
          margin-bottom: 6px;
          color: ${COLORS.ink};
        }

        .input-row {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field input {
          width: 100%;
          padding: 11px 14px;
          font-size: 14.5px;
          font-family: 'Inter', sans-serif;
          border: 1.5px solid ${COLORS.ink};
          background: ${COLORS.paper};
          outline: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .field input::placeholder { color: #b9b2a3; }

        .field input:focus {
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0 rgba(31,27,22,0.85);
          background: #fff;
        }

        .field.has-error input {
          border-color: ${COLORS.coral};
        }
        .field.has-error input:focus {
          box-shadow: 3px 3px 0 rgba(255,107,94,0.55);
        }

        .field-error {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 12.5px;
          color: ${COLORS.coral};
          font-family: 'Kalam', cursive;
        }

        .toggle-eye {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: ${COLORS.pencil};
          display: flex;
        }
        .toggle-eye:hover { color: ${COLORS.ink}; }

        .strength-row {
          display: flex;
          gap: 4px;
          margin-top: 8px;
          align-items: center;
        }
        .strength-bar {
          height: 4px;
          flex: 1;
          background: ${COLORS.line};
          border-radius: 2px;
          overflow: hidden;
        }
        .strength-bar > span {
          display: block;
          height: 100%;
          width: 0%;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .strength-label {
          font-size: 11.5px;
          font-family: 'Kalam', cursive;
          color: ${COLORS.pencil};
          width: 78px;
          text-align: right;
        }

        .row-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 7px;
          color: ${COLORS.pencil};
          font-family: 'Kalam', cursive;
        }

        .remember input { accent-color: ${COLORS.coral}; }

        .forgot {
          color: ${COLORS.coral};
          text-decoration: none;
          font-family: 'Kalam', cursive;
        }
        .forgot:hover { text-decoration: underline; }

        .submit-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFF1EF;
          border: 1.5px solid ${COLORS.coral};
          color: ${COLORS.ink};
          padding: 10px 12px;
          font-size: 13px;
          font-family: 'Kalam', cursive;
          margin-bottom: 16px;
        }

        .cta {
          position: relative;
          width: 100%;
          padding: 13px 18px;
          background: ${COLORS.ink};
          color: ${COLORS.paper};
          border: 1.5px solid ${COLORS.ink};
          font-family: 'Kalam', cursive;
          font-size: 17px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          overflow: visible;
          transition: transform 0.12s ease, opacity 0.15s ease;
        }

        .cta:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .cta:active:not(:disabled) { transform: translateY(1px); }

        .cta .scribble {
          position: absolute;
          bottom: -9px;
          left: 8%;
          width: 84%;
          height: 12px;
          overflow: visible;
        }

        .cta .scribble path {
          fill: none;
          stroke: ${COLORS.coral};
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          transition: stroke-dashoffset 0.45s ease;
        }

        .cta:hover:not(:disabled) .scribble path {
          stroke-dashoffset: 0;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 26px 0 20px;
          color: ${COLORS.pencil};
          font-size: 12.5px;
          font-family: 'Kalam', cursive;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1.5px;
          background-image: linear-gradient(to right, ${COLORS.ink} 60%, transparent 0%);
          background-size: 8px 1.5px;
        }

        .socials {
          display: flex;
          gap: 12px;
          margin-bottom: 22px;
        }

        .social-btn {
          flex: 1;
          padding: 10px;
          border: 1.5px solid ${COLORS.ink};
          background: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .social-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0 rgba(31,27,22,0.85);
        }

        .footer-text {
          text-align: center;
          font-size: 13.5px;
          color: ${COLORS.pencil};
        }

        .footer-text a {
          color: ${COLORS.coral};
          text-decoration: none;
          font-weight: 600;
        }
        .footer-text a:hover { text-decoration: underline; }

        .badge-corner {
          position: absolute;
          top: -18px;
          right: -18px;
          background: ${COLORS.yellow};
          border: 1.5px solid ${COLORS.ink};
          border-radius: 50%;
          width: 66px;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: 13px;
          line-height: 1.1;
          transform: rotate(12deg);
          z-index: 5;
          box-shadow: 3px 3px 0 rgba(31,27,22,0.85);
        }
      `}</style>

      <nav className="nav">
        <div className="brand">
          <SketchrLogo size={30} />
          Sketchr
        </div>
        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">How to Use</a>
        </div>
      </nav>

      <div className="stage">
        <StickyNote top="10%" left="6%" rotate={-8} color={COLORS.yellow} delay={0}>
          <Users size={14} style={{ marginBottom: 4 }} /> real-time boards, together
        </StickyNote>
        <StickyNote top="18%" right="7%" rotate={7} color="#CFEFEC" delay={1.2}>
          <InfinityIcon size={14} style={{ marginBottom: 4 }} /> canvas never runs out
        </StickyNote>
        <StickyNote bottom="9%" left="9%" rotate={5} color="#FFD9D3" delay={0.6}>
          grab a marker, no rules
        </StickyNote>
        <StickyNote bottom="12%" right="8%" rotate={-6} color="#E8E2FF" delay={1.8}>
          sketch it before you build it
        </StickyNote>

        <div className={`card-wrap ${shake ? "shake" : ""}`}>
          <svg className="marker-frame" viewBox="0 0 448 434" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M8,20 C6,10 20,6 40,7 C160,3 300,4 420,8 C438,9 440,20 439,34
                 C441,140 440,260 438,380 C437,404 430,414 410,415
                 C280,420 150,418 30,414 C12,413 7,402 8,384
                 C6,260 7,140 8,20 Z"
            />
          </svg>

          <div className="card">
            <div className="badge-corner">DRAW<br/>ME IN</div>
            <div className="card-pin" />
            <h1>Welcome back, sketcher.</h1>
            <p className="sub">Log in to pick up right where your last board left off.</p>

            {submitError && (
              <div className="submit-banner" role="alert">
                <AlertCircle size={16} />
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={`field ${touched.email && errors.email ? "has-error" : ""}`}>
                <label htmlFor="email">Email</label>
                <div className="input-row">
                  <input
                    id="email"
                    type="email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched("email")}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby="email-error"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="field-error" id="email-error" aria-live="polite">
                    <AlertCircle size={13} /> {errors.email}
                  </div>
                )}
              </div>

              <div className={`field ${touched.password && errors.password ? "has-error" : ""}`}>
                <label htmlFor="password">Password</label>
                <div className="input-row">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => markTouched("password")}
                    style={{ paddingRight: 40 }}
                    aria-invalid={Boolean(touched.password && errors.password)}
                    aria-describedby="password-error"
                  />
                  <button
                    type="button"
                    className="toggle-eye"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {password && (
                  <div className="strength-row">
                    <div className="strength-bar">
                      <span
                        style={{
                          width: `${(strength.score / 4) * 100}%`,
                          background:
                            strength.score <= 1 ? COLORS.coral :
                            strength.score === 2 ? COLORS.yellow :
                            COLORS.teal,
                        }}
                      />
                    </div>
                    <span className="strength-label">{strength.label}</span>
                  </div>
                )}

                {touched.password && errors.password && (
                  <div className="field-error" id="password-error" aria-live="polite">
                    <AlertCircle size={13} /> {errors.password}
                  </div>
                )}
              </div>

              <div className="row-between">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="forgot">Forgot password?</a>
              </div>

              <button type="submit" className="cta" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={17} className="spin" /> Logging in...
                  </>
                ) : (
                  <>
                    Start drawing now <ArrowRight size={17} />
                  </>
                )}
                <svg className="scribble" viewBox="0 0 220 12" preserveAspectRatio="none">
                  <path d="M2,6 C40,2 80,10 110,5 C140,0 180,9 218,4" />
                </svg>
              </button>
            </form>

            <div className="divider">or continue with</div>

            <div className="socials">
              <button className="social-btn">Google</button>
              <button className="social-btn">GitHub</button>
            </div>

            <p className="footer-text">
              New to Sketchr? <a href="#">Sign up free</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}