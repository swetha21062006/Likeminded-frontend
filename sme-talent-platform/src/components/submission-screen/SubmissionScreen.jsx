import React, { useState } from "react";
import styles from "./SubmissionScreen.module.css";

const SubmissionScreen = ({ onNavigate, selectedProblem }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", {
      title,
      description,
      files,
      problem: selectedProblem,
    });
    setSubmitted(true);
    setTimeout(() => onNavigate("user-dashboard"), 2000);
  };

  if (submitted) {
    return (
      <div className={styles.screen}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Solution Submitted!</h2>
          <p className={styles.successMsg}>Redirecting to dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Submit Solution</h1>
          <p className={styles.subtitle}>
            {selectedProblem?.title
              ? `For: ${selectedProblem.title}`
              : "Select a problem from the dashboard"}
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Problem summary */}
          {selectedProblem && (
            <div className={styles.problemInfo}>
              <h2 className={styles.problemTitle}>{selectedProblem.title}</h2>
              {selectedProblem.description && (
                <p className={styles.problemDesc}>
                  {selectedProblem.description}
                </p>
              )}
              <div className={styles.metaRow}>
                {selectedProblem.deadline && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Deadline</span>
                    <span className={styles.metaValue}>
                      {selectedProblem.deadline}
                    </span>
                  </div>
                )}
                {selectedProblem.reward && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Reward</span>
                    <span className={styles.metaValue}>
                      {selectedProblem.reward}
                    </span>
                  </div>
                )}
                {selectedProblem.difficulty && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Difficulty</span>
                    <span
                      className={`${styles.badge} ${styles[selectedProblem.difficulty.toLowerCase()]}`}
                    >
                      {selectedProblem.difficulty}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Solution Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Give your solution a clear title"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Solution Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                rows={7}
                placeholder="Describe your solution in detail. Include your approach, methodology, and expected outcomes…"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Attachments</label>
              <div className={styles.dropZone}>
                <input
                  type="file"
                  id="files"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  multiple
                />
                <label htmlFor="files" className={styles.dropLabel}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className={styles.dropText}>
                    Click to upload or drag &amp; drop
                  </span>
                  <span className={styles.dropHint}>
                    PNG, JPG, PDF, DOCX up to 10 MB
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
                        className={styles.removeBtn}
                        onClick={() => removeFile(i)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => onNavigate("user-dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit Solution
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmissionScreen;
