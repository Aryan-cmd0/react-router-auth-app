import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      navigate("/");
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: 24
    }}>
      <div style={{
        width: "100%", maxWidth: 380,
        background: "var(--color-background-primary, #fff)",
        border: "0.5px solid rgba(0,0,0,0.1)",
        borderRadius: 16, padding: "36px 32px"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#7F77DD" }}>
            Dev<span style={{ color: "#D4537E" }}>Pulse</span>
          </div>
          <p style={{ fontSize: 13, color: "gray", marginTop: 6 }}>
            Sign in to your account
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "gray", display: "block", marginBottom: 5 }}>Email</label>
            <input
              type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", height: 40, padding: "0 12px",
                border: "0.5px solid rgba(0,0,0,0.15)",
                borderRadius: 8, fontSize: 14, outline: "none",
                background: "var(--color-background-secondary, #f5f5f5)"
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "gray", display: "block", marginBottom: 5 }}>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", height: 40, padding: "0 12px",
                border: "0.5px solid rgba(0,0,0,0.15)",
                borderRadius: 8, fontSize: 14, outline: "none",
                background: "var(--color-background-secondary, #f5f5f5)"
              }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", height: 42, marginTop: 20,
            background: loading ? "#AFA9EC" : "#534AB7",
            color: "#EEEDFE", border: "none",
            borderRadius: 999, fontSize: 14, fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s"
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "gray", marginTop: 16 }}>
          No account? <a href="/register" style={{ color: "#7F77DD", textDecoration: "none" }}>Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;