import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import SketchrLogo from "./SketchrLogo";
import { useNavigate } from "react-router-dom";
const COLORS = {
  paper: "#F7F2E9",
  ink: "#22201B",
  primary: "#F2994A",
  secondary: "#5B5FEF",
  pencil: "#8B8478",
};

export default function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  await createUser();
}

  const createUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/register", {
      // const res = await fetch("https://sketchr.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      alert("Account Created Successfully");

      // Register ke baad login page par bhej do
      navigate("/Login");

    } catch (error) {
      console.error(error);
      setError("Server Error");
    }
  };

  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>

      {/* LEFT — brand panel */}
      <div style={styles.brandPanel}>
        <div style={styles.brand}>
          <SketchrLogo size={30} />
          Sketchr
        </div>
        <div style={styles.brandMid}>
          <p style={styles.quote}>
            "Your first board takes about ninety seconds to set up."
          </p>
          <p style={styles.quoteBy}>— genuinely, that's the whole onboarding</p>
        </div>
        <svg width="100%" height="80" viewBox="0 0 300 80" style={{ opacity: 0.6 }}>
          <path d="M10,20 C60,70 100,10 150,50 C200,90 250,20 290,60"
            fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* RIGHT — form panel */}
      <div style={styles.formPanel}>
        <div style={styles.formBox}>
          <h1 style={styles.title}>Get your board</h1>
          <p style={styles.subtitle}>Free plan, no credit card.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passwordRow}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label style={styles.label} htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.submitButton}>
              Create account <ArrowRight size={17} />
            </button>
          </form>

          <p style={styles.footerText}>
            Already sketching with us?{" "}
            <span onClick={() => navigate('/Login')} style={styles.link}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Manrope', sans-serif",
    color: COLORS.ink,
  },
  brandPanel: {
    flex: "1 1 40%",
    background: COLORS.primary,
    color: COLORS.ink,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "28px",
  },
  brandMid: { maxWidth: "340px" },
  quote: {
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "20px",
    lineHeight: 1.5,
  },
  quoteBy: { fontSize: "13px", opacity: 0.75 },
  formPanel: {
    flex: "1 1 60%",
    background: COLORS.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  formBox: { width: "360px", maxWidth: "100%" },
  title: {
    fontFamily: "'Gochi Hand', cursive",
    fontSize: "38px",
    margin: "0 0 4px",
  },
  subtitle: { color: COLORS.pencil, fontSize: "14px", marginBottom: "24px" },
  errorBox: {
    background: "#FFF1EF",
    border: `1.5px solid ${COLORS.primary}`,
    padding: "10px 12px",
    fontSize: "13px",
    marginBottom: "16px",
    fontFamily: "'Architects Daughter', cursive",
  },
  label: {
    display: "block",
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "13px",
    marginBottom: "6px",
    marginTop: "14px",
  },
  input: {
    width: "100%",
    padding: "11px 12px",
    fontSize: "14px",
    border: `1.5px solid ${COLORS.ink}`,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  passwordRow: { position: "relative" },
  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: COLORS.pencil,
  },
  submitButton: {
    width: "100%",
    marginTop: "22px",
    padding: "12px",
    background: COLORS.secondary,
    color: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    fontFamily: "'Architects Daughter', cursive",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: COLORS.pencil,
    marginTop: "20px",
  },
  link: {
    color: COLORS.secondary,
    fontWeight: 700,
    cursor: "pointer",
  },
};