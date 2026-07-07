import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import SketchrLogo from "./SketchrLogo";
import { useNavigate } from "react-router-dom";

const COLORS = {
  paper: "#FBF8F1",
  ink: "#1F1B16",
  coral: "#FF6B5E",
  pencil: "#8A8478",
};

export default function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();

    // Simple step-by-step validation, easy to read top to bottom
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
    onRegisterSuccess();
  }

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <SketchrLogo size={28} />
          Sketchr
        </div>
      </nav>

      <div style={styles.stage}>
        <div style={styles.card}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>Start sketching your ideas in minutes.</p>

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
              Sign up <ArrowRight size={17} />
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <span onClick={()=>navigate('/login')} style={styles.link}>
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
    backgroundColor: COLORS.paper,
    fontFamily: "'Inter', sans-serif",
    color: COLORS.ink,
  },
  nav: {
    padding: "20px 40px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Caveat', cursive",
    fontWeight: 700,
    fontSize: "26px",
  },
  stage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
  },
  card: {
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    padding: "36px",
    width: "380px",
    maxWidth: "100%",
    boxShadow: `6px 6px 0 rgba(31,27,22,0.9)`,
  },
  title: {
    fontFamily: "'Caveat', cursive",
    fontWeight: 700,
    fontSize: "36px",
    margin: "0 0 4px",
  },
  subtitle: {
    color: COLORS.pencil,
    fontSize: "14px",
    marginBottom: "20px",
  },
  errorBox: {
    background: "#FFF1EF",
    border: `1.5px solid ${COLORS.coral}`,
    padding: "10px 12px",
    fontSize: "13px",
    marginBottom: "16px",
    fontFamily: "'Kalam', cursive",
  },
  label: {
    display: "block",
    fontFamily: "'Kalam', cursive",
    fontSize: "13px",
    marginBottom: "6px",
    marginTop: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: `1.5px solid ${COLORS.ink}`,
    background: COLORS.paper,
    outline: "none",
    boxSizing: "border-box",
  },
  passwordRow: {
    position: "relative",
  },
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
    background: COLORS.ink,
    color: COLORS.paper,
    border: `1.5px solid ${COLORS.ink}`,
    fontFamily: "'Kalam', cursive",
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
    color: COLORS.coral,
    fontWeight: 600,
    cursor: "pointer",
  },
};