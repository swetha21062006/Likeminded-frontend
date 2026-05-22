import React, { useState } from "react";
import styles from "./VendorLogin.module.css";
import {
  signInWithGoogle,
  signInWithGithub,
  authService,
} from "../../services/authService";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#24292e"
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  </svg>
);

const validateEmail = (v) => {
  if (!v.trim()) return "Email is required.";
  if (!/^\S+@\S+\.\S+$/.test(v.trim())) return "Enter a valid email address.";
  return "";
};
const validatePassword = (v) => {
  if (!v) return "Password is required.";
  if (v.length < 6) return "Password must be at least 6 characters.";
  return "";
};

const VendorLogin = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const clearErr = (field) =>
    setErrors((p) => {
      const e = { ...p };
      delete e[field];
      return e;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearErr(name);
    setFormError("");
  };

  const goToDashboard = (user) =>
    onNavigate("vendor-dashboard", {
      userType: "vendor",
      currentUser: {
        email: user.email,
        displayName: user.displayName || user.businessName || null,
        uid: user._id || user.uid,
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const user = await authService.login(
        formData.email,
        formData.password,
        "vendor",
        remember,
      );
      goToDashboard(user);
    } catch (err) {
      const msg = (err.message || "").toLowerCase();
      if (msg.includes("no account") || msg.includes("not found")) {
        setErrors({ email: "No account found with this email." });
      } else if (msg.includes("incorrect") || msg.includes("password")) {
        setErrors({ password: "Incorrect password. Please try again." });
      } else if (msg.includes("student")) {
        setFormError(
          "This email is registered as a Student. Please use Student Login.",
        );
      } else {
        setFormError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError("");
    setLoading(true);
    try {
      const r = await signInWithGoogle();
      goToDashboard(r);
    } catch {
      setFormError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setFormError("");
    setLoading(true);
    try {
      const r = await signInWithGithub();
      goToDashboard(r);
    } catch {
      setFormError("GitHub sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Vendor Login</h2>
        <p className={styles.subtitle}>
          Access your account to post business problems
        </p>

        {formError && (
          <div className={styles.alertError}>
            <span>⚠️</span> {formError}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.req}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={handleChange}
              onBlur={() => {
                const err = validateEmail(formData.email);
                if (err) setErrors((p) => ({ ...p, email: err }));
              }}
              className={`${styles.input} ${errors.email ? styles.inputError : formData.email && !errors.email ? styles.inputSuccess : ""}`}
              placeholder="business@example.com"
            />
            {errors.email && (
              <p className={styles.fieldError}>⚠ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password <span className={styles.req}>*</span>
            </label>
            <div className={styles.passwordWrap}>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={() => {
                  const err = validatePassword(formData.password);
                  if (err) setErrors((p) => ({ ...p, password: err }));
                }}
                className={`${styles.input} ${errors.password ? styles.inputError : formData.password && !errors.password ? styles.inputSuccess : ""}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass((v) => !v)}
                tabIndex={-1}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className={styles.fieldError}>⚠ {errors.password}</p>
            )}
            <div className={styles.forgotRow}>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => alert("Password reset coming soon!")}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className={styles.checkbox}
            />
            Remember me for 7 days
          </label>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <div className={styles.socialLogin}>
          <button
            className={styles.socialButton}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon /> Sign in with Google
          </button>
          <button
            className={styles.socialButton}
            onClick={handleGithubLogin}
            disabled={loading}
          >
            <GithubIcon /> Sign in with GitHub
          </button>
        </div>

        <div className={styles.footer}>
          <p className={styles.centerText}>
            Don't have an account?{" "}
            <button
              className={styles.linkButton}
              onClick={() => onNavigate("vendor-signup")}
            >
              Sign up
            </button>
          </p>
        </div>

        <button
          className={styles.backButton}
          onClick={() => onNavigate("landing")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default VendorLogin;
