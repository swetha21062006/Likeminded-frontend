import React, { useState } from "react";
import styles from "./UserLogin.module.css";
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

// ── Validators ────────────────────────────────────────────────────────────────
const validateName = (v) => {
  if (!v.trim()) return "Full name is required.";
  if (v.trim().length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z\s'-]+$/.test(v.trim()))
    return "Name can only contain letters, spaces, hyphens or apostrophes.";
  return "";
};
const validateEmail = (v) => {
  if (!v.trim()) return "Email is required.";
  if (!/^\S+@\S+\.\S+$/.test(v.trim())) return "Enter a valid email address.";
  return "";
};
const validatePassword = (v) => {
  if (!v) return "Password is required.";
  if (v.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(v))
    return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(v)) return "Password must contain at least one number.";
  return "";
};
const validateConfirm = (pass, confirm) => {
  if (!confirm) return "Please confirm your password.";
  if (pass !== confirm) return "Passwords do not match.";
  return "";
};

const getStrength = (p) => {
  if (!p) return { score: 0, label: "", color: "#e2e8f0" };
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const map = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const col = [
    "#e2e8f0",
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#059669",
  ];
  return { score: s, label: map[s], color: col[s] };
};

const UserSignup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(formData.password);

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
    onNavigate("user-dashboard", {
      userType: "student",
      currentUser: {
        email: user.email,
        displayName: user.displayName || user.fullName || null,
        uid: user._id || user.uid,
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const newErrors = {
      fullName: validateName(formData.fullName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirm(
        formData.password,
        formData.confirmPassword,
      ),
    };
    // Remove empty strings
    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const user = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        university: formData.university,
        password: formData.password,
        userType: "student",
      });
      goToDashboard(user);
    } catch (err) {
      const msg = (err.message || "").toLowerCase();
      if (
        msg.includes("already exists") ||
        msg.includes("duplicate") ||
        msg.includes("email")
      ) {
        setErrors({ email: "An account with this email already exists." });
      } else {
        setFormError(err.message || "Registration failed. Please try again.");
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
      setFormError("Google sign-up failed. Please try again.");
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
      setFormError("GitHub sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Student Sign Up</h2>
        <p className={styles.subtitle}>
          Create your account to start solving business problems
        </p>

        {formError && (
          <div className={styles.alertError}>
            <span>⚠️</span> {formError}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Full Name <span className={styles.req}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              autoComplete="name"
              onChange={handleChange}
              onBlur={() => {
                const err = validateName(formData.fullName);
                if (err) setErrors((p) => ({ ...p, fullName: err }));
              }}
              className={`${styles.input} ${errors.fullName ? styles.inputError : formData.fullName && !errors.fullName ? styles.inputSuccess : ""}`}
              placeholder="John Smith"
            />
            {errors.fullName && (
              <p className={styles.fieldError}>⚠ {errors.fullName}</p>
            )}
          </div>

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
              placeholder="john@university.edu"
            />
            {errors.email && (
              <p className={styles.fieldError}>⚠ {errors.email}</p>
            )}
          </div>

          {/* University */}
          <div className={styles.formGroup}>
            <label htmlFor="university" className={styles.label}>
              University / Institution
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className={styles.input}
              placeholder="Your university"
            />
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
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={() => {
                  const err = validatePassword(formData.password);
                  if (err) setErrors((p) => ({ ...p, password: err }));
                }}
                className={`${styles.input} ${errors.password ? styles.inputError : formData.password && !errors.password ? styles.inputSuccess : ""}`}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
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
            {/* Strength bar */}
            {formData.password && (
              <div className={styles.strengthWrap}>
                <div className={styles.strengthBar}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={styles.strengthSegment}
                      style={{
                        background:
                          i <= strength.score ? strength.color : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
                <span
                  className={styles.strengthLabel}
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password <span className={styles.req}>*</span>
            </label>
            <div className={styles.passwordWrap}>
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={() => {
                  const err = validateConfirm(
                    formData.password,
                    formData.confirmPassword,
                  );
                  if (err) setErrors((p) => ({ ...p, confirmPassword: err }));
                }}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : formData.confirmPassword && !errors.confirmPassword ? styles.inputSuccess : ""}`}
                placeholder="Re-enter password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.fieldError}>⚠ {errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Account"}
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
            <GoogleIcon /> Sign up with Google
          </button>
          <button
            className={styles.socialButton}
            onClick={handleGithubLogin}
            disabled={loading}
          >
            <GithubIcon /> Sign up with GitHub
          </button>
        </div>

        <div className={styles.footer}>
          <p className={styles.centerText}>
            Already have an account?{" "}
            <button
              className={styles.linkButton}
              onClick={() => onNavigate("user-login")}
            >
              Login
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

export default UserSignup;
