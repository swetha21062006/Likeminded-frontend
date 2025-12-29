import React, { useState } from "react";
import styles from "./UserLogin.module.css";

const UserLogin = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally authenticate the user
    console.log("User login:", formData);
    // Navigate to user dashboard after successful login
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <a href="#" className={styles.link}>
              Sign up
            </a>
          </p>
          <a href="#" className={styles.link}>
            Forgot password?
          </a>
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
