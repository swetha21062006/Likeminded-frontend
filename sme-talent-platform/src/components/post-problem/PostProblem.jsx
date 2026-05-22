import React, { useState } from "react";
import styles from "./PostProblem.module.css";

const CATEGORIES = [
  "Marketing",
  "Web Design",
  "App Development",
  "Graphic Design",
  "Business Strategy",
  "Data Analysis",
  "Other",
];

const PostProblem = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    deadline: "",
    reward: "",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (Number(formData.reward) <= 0) {
      setError("Reward must be greater than 0.");
      return;
    }
    console.log("Posting problem:", { ...formData, files });
    setSubmitted(true);
    setTimeout(() => onNavigate("vendor-dashboard"), 1800);
  };

  if (submitted) {
    return (
      <div className={styles.postProblem}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Problem Posted!</h2>
          <p className={styles.successMsg}>Redirecting to dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postProblem}>
      {/* Fixed Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <span className={styles.navLogo}>SME Platform</span>
          <ul className={styles.navLinks}>
            <li onClick={() => onNavigate("vendor-dashboard")}>Dashboard</li>
            <li className={styles.navActive}>Post Problem</li>
            <li onClick={() => onNavigate("review-solutions")}>
              Review Solutions
            </li>
            <li
              className={styles.navLogout}
              onClick={() => onNavigate("landing")}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Post a New Problem</h2>
              <p className={styles.formSubtitle}>
                Fill in the details below to attract the right student talent
              </p>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            {/* Title */}
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Problem Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. Marketing Strategy for Local Cafe"
                required
              />
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Problem Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows={6}
                placeholder="Describe the problem in detail. What do you need? What is the expected outcome? Any constraints or requirements?"
                required
              />
            </div>

            {/* Category + Difficulty */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="difficulty" className={styles.label}>
                  Difficulty *
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Deadline + Reward */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="deadline" className={styles.label}>
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={styles.input}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reward" className={styles.label}>
                  Reward (USD) *
                </label>
                <div className={styles.inputPrefix}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    id="reward"
                    name="reward"
                    value={formData.reward}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithPrefix}`}
                    min="1"
                    step="1"
                    placeholder="500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Attachments (optional)</label>
              <div className={styles.dropZone}>
                <input
                  type="file"
                  id="files"
                  onChange={handleFileChange}
                  multiple
                  className={styles.fileInput}
                />
                <label htmlFor="files" className={styles.dropLabel}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className={styles.dropText}>Click to upload files</span>
                  <span className={styles.dropHint}>
                    PDF, DOC, PNG, JPG up to 10 MB
                  </span>
                </label>
              </div>

              {files.length > 0 && (
                <ul className={styles.fileList}>
                  {files.map((file, i) => (
                    <li key={i} className={styles.fileItem}>
                      <span className={styles.fileName}>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className={styles.removeBtn}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => onNavigate("vendor-dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Post Problem
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostProblem;
