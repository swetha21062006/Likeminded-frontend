import React from "react";
import styles from "./VendorDashboard.module.css";

const VendorDashboard = ({ onNavigate }) => {
  const mockProblems = [
    {
      id: 1,
      title: "Marketing Strategy for Local Cafe",
      status: "Open",
      submissions: 3,
    },
    {
      id: 2,
      title: "Website Redesign for Small Business",
      status: "In Review",
      submissions: 5,
    },
    {
      id: 3,
      title: "Social Media Campaign for New Product",
      status: "Closed",
      submissions: 8,
    },
  ];

  const handlePostProblem = () => {
    onNavigate("post-problem");
  };

  const handleReviewSolutions = () => {
    onNavigate("review-solutions");
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Vendor Dashboard</h1>
          <div className={styles.userActions}>
            <button
              className={styles.button}
              onClick={() => onNavigate("landing")}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Posted Problems</h3>
              <p className={styles.statValue}>3</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total Submissions</h3>
              <p className={styles.statValue}>16</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Paid Rewards</h3>
              <p className={styles.statValue}>$1,200</p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.actionButton} onClick={handlePostProblem}>
              Post New Problem
            </button>
            <button
              className={styles.actionButton}
              onClick={handleReviewSolutions}
            >
              Review Solutions
            </button>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Problems</h2>
            <div className={styles.problemList}>
              {mockProblems.map((problem) => (
                <div key={problem.id} className={styles.problemCard}>
                  <h3 className={styles.problemTitle}>{problem.title}</h3>
                  <div className={styles.problemDetails}>
                    <div className={styles.problemDetail}>
                      <span className={styles.detailLabel}>Status:</span>
                      <span
                        className={`${styles.detailValue} ${
                          styles[problem.status.toLowerCase().replace(" ", "-")]
                        }`}
                      >
                        {problem.status}
                      </span>
                    </div>
                    <div className={styles.problemDetail}>
                      <span className={styles.detailLabel}>Submissions:</span>
                      <span className={styles.detailValue}>
                        {problem.submissions}
                      </span>
                    </div>
                  </div>
                  <div className={styles.problemActions}>
                    <button className={styles.actionButtonSmall}>View</button>
                    <button className={styles.actionButtonSmall}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
