import React from "react";
import styles from "./PaymentFeedback.module.css";

const PaymentFeedback = ({ onNavigate, selectedSolution }) => {
  const handleReturnToDashboard = () => {
    onNavigate("vendor-dashboard");
  };

  return (
    <div className={styles.paymentFeedback}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Payment Confirmation</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.confirmationCard}>
            <div className={styles.iconContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h2 className={styles.confirmationTitle}>Payment Successful!</h2>
            <p className={styles.confirmationMessage}>
              Your payment of ${selectedSolution?.reward || "0"} has been
              processed successfully.
            </p>

            <div className={styles.paymentDetails}>
              <h3 className={styles.detailsTitle}>Payment Details</h3>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Solution ID:</span>
                  <span className={styles.detailValue}>
                    #{selectedSolution?.id || "0000"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Problem:</span>
                  <span className={styles.detailValue}>
                    {selectedSolution?.problemTitle || "Unknown"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Team:</span>
                  <span className={styles.detailValue}>
                    {selectedSolution?.teamName || "Unknown"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Amount Paid:</span>
                  <span className={styles.detailValue}>
                    ${selectedSolution?.reward || "0"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Transaction ID:</span>
                  <span className={styles.detailValue}>
                    TXN{Math.floor(Math.random() * 1000000000)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.nextSteps}>
              <h3 className={styles.stepsTitle}>What's Next?</h3>
              <ul className={styles.stepsList}>
                <li>The solution has been marked as approved</li>
                <li>The team has been notified of your approval</li>
                <li>You can download the solution files anytime</li>
                <li>
                  The team will receive the payment within 3-5 business days
                </li>
              </ul>
            </div>

            <div className={styles.actions}>
              <button className={styles.downloadButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Solution
              </button>
              <button
                className={styles.dashboardButton}
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFeedback;
