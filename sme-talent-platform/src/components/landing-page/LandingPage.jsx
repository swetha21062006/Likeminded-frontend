import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = ({ onNavigate }) => {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Connecting SMEs with Emerging Talent</h1>
          <p className={styles.subtitle}>
            A bridge between small businesses and innovative students
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${styles.studentButton}`}
              onClick={() => onNavigate("user-login")}
            >
              Login as Student
            </button>
            <button
              className={`${styles.button} ${styles.vendorButton}`}
              onClick={() => onNavigate("vendor-login")}
            >
              Login as Vendor
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Post Problems For SMEs</h3>
              <p className={styles.featureDescription}>
                Share your business challenges and get innovative solutions from
                talented students
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11H3v10h6V11z"></path>
                  <path d="M21 3h-6v18h6V3z"></path>
                  <path d="M15 7H9v14h6V7z"></path>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>
                Solve Real Projects For Students
              </h3>
              <p className={styles.featureDescription}>
                Work on actual business problems and build your portfolio while
                earning rewards
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
