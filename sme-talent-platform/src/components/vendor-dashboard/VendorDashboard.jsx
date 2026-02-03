import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./VendorDashboard.module.css";

const VendorDashboard = ({ onNavigate }) => {
  const [currentVendor, setCurrentVendor] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentVendor(user);
      } else {
        setCurrentVendor(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      onNavigate("landing");
    });
  };

  const handleProfileClick = () => {
    onNavigate("vendor-profile");
  };

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

  // Dashboard welcome section with vendor name only
  const getDashboardWelcome = () => {
    if (!currentVendor) {
      return <p className={styles.loadingText}>Loading vendor information...</p>;
    }

    return (
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>
          Welcome, {currentVendor.displayName || currentVendor.email}
        </h2>
        <button className={styles.profileButton} onClick={handleProfileClick}>
          View Profile
        </button>
      </div>
    );
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Vendor Dashboard</h1>
          <div className={styles.userActions}>
            <button
              className={styles.button}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {getDashboardWelcome()}

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
