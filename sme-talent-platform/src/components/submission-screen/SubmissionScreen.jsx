import React, { useState } from "react";
import styles from "./SubmissionScreen.module.css";

const SubmissionScreen = ({ onNavigate, selectedProblem }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the solution
    console.log("Submitting solution:", {
      title,
      description,
      files,
      problem: selectedProblem,
    });
    onNavigate("user-dashboard");
  };

  return (
    <div className={styles.submissionScreen}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Submit Solution</h1>
          <p className={styles.subtitle}>
            Provide your solution for: {selectedProblem?.title}
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.problemInfo}>
            <h2 className={styles.problemTitle}>{selectedProblem?.title}</h2>
            <p className={styles.problemDescription}>
              {selectedProblem?.description}
            </p>
            <div className={styles.problemDetails}>
              <div className={styles.problemDetail}>
                <span className={styles.detailLabel}>Deadline:</span>
                <span className={styles.detailValue}>
                  {selectedProblem?.deadline}
                </span>
              </div>
              <div className={styles.problemDetail}>
                <span className={styles.detailLabel}>Reward:</span>
                <span className={styles.detailValue}>
                  {selectedProblem?.reward}
                </span>
              </div>
            </div>
          </div>

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
                rows={6}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="files" className={styles.label}>
                Attachments
              </label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  id="files"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  multiple
                />
                <label htmlFor="files" className={styles.fileLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Click to upload or drag and drop</span>
                  <p>PNG, JPG, PDF up to 10MB</p>
                </label>
              </div>

              {files.length > 0 && (
                <div className={styles.fileList}>
                  {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      <span className={styles.fileName}>{file.name}</span>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeFile(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => onNavigate("user-dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
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
