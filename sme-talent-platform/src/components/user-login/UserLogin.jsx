import React, { useState } from "react";
import styles from "./UserLogin.module.css";

const UserLogin = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password: "********" });
    onNavigate("user-dashboard", { userType: "student" });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Student Login</h2>
        <p className={styles.subtitle}>
          Access your account to solve real business problems
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <button
              className={styles.linkButton}
              onClick={() => onNavigate("user-signup")}
            >
              Sign up
            </button>
          </p>
          <button
            className={styles.linkButton}
            onClick={() => onNavigate("forgot-password")}
          >
            Forgot password?
          </button>
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

export default UserLogin;
