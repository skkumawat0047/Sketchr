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

export default function LoginPage({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    await userLogin();
  }

  const userLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/login", {
      // const res = await fetch("https://sketchr.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem("userId",data.userId);
      localStorage.setItem("sketchr_user_name",data.userName);
      alert("Login Successful");
      navigate("/Dashboard");

    } catch (error) {
      console.error("Fetch Error:", error);
      setError(error.message);
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
            "We stopped scheduling meetings just to look at the same board."
          </p>
          <p style={styles.quoteBy}>— a team that switched to Sketchr</p>
        </div>
        <svg width="100%" height="80" viewBox="0 0 300 80" style={{ opacity: 0.6 }}>
          <path d="M10,50 C60,10 100,70 150,30 C200,-10 250,60 290,20"
            fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* RIGHT — form panel */}
      <div style={styles.formPanel}>
        <div style={styles.formBox}>
          <h1 style={styles.title}>Log back in</h1>
          <p style={styles.subtitle}>Your boards missed you.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="sk.kumawat0047@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passwordRow}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="sanjay2325"
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

            <button type="submit" style={styles.submitButton}>
              Continue <ArrowRight size={17} />
            </button>
          </form>

          <p style={styles.footerText}>
            First time here?{" "}
            <span onClick={() => navigate('/Register')} style={styles.link}>
              Create an account
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
    background: COLORS.secondary,
    color: "#fff",
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
  quoteBy: { fontSize: "13px", opacity: 0.8 },
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
    background: COLORS.primary,
    color: COLORS.ink,
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