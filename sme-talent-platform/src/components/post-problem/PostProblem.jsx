import React, { useState } from "react";
import styles from "./PostProblem.module.css";

const PostProblem = ({ onNavigate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reward, setReward] = useState("");
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
    // In a real app, this would post the problem
    console.log("Posting problem:", {
      title,
      description,
      category,
      difficulty,
      deadline,
      reward,
      files,
    });
    onNavigate("vendor-dashboard");
  };

  return (
    <div className={styles.postProblem}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Post a Problem</h1>
          <p className={styles.subtitle}>
            Share your business challenge to get innovative solutions
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Problem Title
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
                Problem Description
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

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Web Design">Web Design</option>
                  <option value="App Development">App Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Business Strategy">Business Strategy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="difficulty" className={styles.label}>
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
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

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="deadline" className={styles.label}>
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reward" className={styles.label}>
                  Reward ($)
                </label>
                <input
                  type="number"
                  id="reward"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  className={styles.input}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
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
                onClick={() => onNavigate("vendor-dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
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
