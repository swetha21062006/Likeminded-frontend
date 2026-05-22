import React, { useMemo } from "react";
import styles from "./PaymentFeedback.module.css";

const PaymentFeedback = ({ onNavigate, selectedSolution }) => {
  // Generate a stable transaction ID for this render
  const txnId = useMemo(
    () =>
      "TXN" +
      Math.floor(Math.random() * 1_000_000_000)
        .toString()
        .padStart(9, "0"),
    [],
  );

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const details = [
    { label: "Solution ID", value: `#${selectedSolution?.id ?? "0000"}` },
    { label: "Problem", value: selectedSolution?.problemTitle ?? "—" },
    { label: "Team", value: selectedSolution?.teamName ?? "—" },
    {
      label: "Amount Paid",
      value: selectedSolution?.reward ? `$${selectedSolution.reward}` : "$0",
    },
    { label: "Transaction ID", value: txnId },
    { label: "Date", value: today },
  ];

  const nextSteps = [
    "The solution has been marked as approved in the system.",
    "The student team has been notified of your approval.",
    "You can download the solution files at any time.",
    "Payment will be released to the team within 3–5 business days.",
  ];

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Payment Confirmation</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            {/* Success icon */}
            <div className={styles.iconWrap}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h2 className={styles.successTitle}>Payment Successful!</h2>
            <p className={styles.successMsg}>
              Your payment has been processed and the solution approved.
            </p>

            {/* Payment details */}
            <div className={styles.detailsBox}>
              <h3 className={styles.boxTitle}>Payment Details</h3>
              <dl className={styles.detailsList}>
                {details.map(({ label, value }) => (
                  <div key={label} className={styles.detailRow}>
                    <dt className={styles.detailLabel}>{label}</dt>
                    <dd className={styles.detailValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Next steps */}
            <div className={styles.nextSteps}>
              <h3 className={styles.boxTitle}>What Happens Next?</h3>
              <ul className={styles.stepsList}>
                {nextSteps.map((step, i) => (
                  <li key={i} className={styles.stepItem}>
                    <span className={styles.stepDot}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button className={styles.downloadBtn}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Solution
              </button>

              <button
                className={styles.dashboardBtn}
                onClick={() => onNavigate("vendor-dashboard")}
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
