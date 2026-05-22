import React, { useState } from "react";
import styles from "./ReviewSolutions.module.css";

const MOCK_SOLUTIONS = [
  {
    id: 1,
    problemTitle: "Marketing Strategy for Local Cafe",
    teamName: "Marketing Mavericks",
    submittedDate: "2023-11-20",
    status: "Pending Review",
    preview:
      "Our strategy focuses on hyper-local social media targeting combined with a loyalty program to drive repeat visits. We propose a 3-phase rollout: brand awareness, engagement, then conversion.",
    attachments: ["Marketing_Strategy.pdf", "Social_Media_Calendar.xlsx"],
  },
  {
    id: 2,
    problemTitle: "Website Redesign for Small Business",
    teamName: "Design Dynamos",
    submittedDate: "2023-11-18",
    status: "Pending Review",
    preview:
      "We redesigned the website with a mobile-first approach, improved navigation, and a streamlined checkout flow. Load time reduced by 40% through image optimisation and lazy loading.",
    attachments: ["Wireframes_v2.pdf", "Design_System.figma"],
  },
  {
    id: 3,
    problemTitle: "Social Media Campaign for New Product",
    teamName: "Creative Minds",
    submittedDate: "2023-11-15",
    status: "Approved",
    preview:
      "A 30-day influencer-led campaign across Instagram and TikTok, targeting 18-35 year olds. Projected reach of 500k+ impressions in the first week.",
    attachments: ["Campaign_Brief.pdf", "Content_Plan.docx"],
  },
];

const StatusBadge = ({ status }) => {
  const cls =
    status === "Approved"
      ? styles.approved
      : status === "Rejected"
        ? styles.rejected
        : styles.pending;
  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
};

const StarRating = ({ value, onChange }) => (
  <div className={styles.stars}>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`${styles.star} ${star <= value ? styles.starActive : ""}`}
        onClick={() => onChange(star)}
        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
      >
        ★
      </button>
    ))}
  </div>
);

const ReviewSolutions = ({ onNavigate }) => {
  const [selected, setSelected] = useState(null);
  const [solutions, setSolutions] = useState(MOCK_SOLUTIONS);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [formError, setFormError] = useState("");

  const handleSelect = (sol) => {
    setSelected(sol);
    setFeedback("");
    setRating(0);
    setFormError("");
  };

  const handleApprove = (e) => {
    e.preventDefault();
    setFormError("");
    if (rating === 0) {
      setFormError("Please give a star rating.");
      return;
    }
    if (!feedback.trim()) {
      setFormError("Please provide feedback before approving.");
      return;
    }

    setSolutions((prev) =>
      prev.map((s) =>
        s.id === selected.id ? { ...s, status: "Approved" } : s,
      ),
    );
    onNavigate("payment-feedback", { selectedSolution: selected });
  };

  const handleReject = () => {
    if (!feedback.trim()) {
      setFormError("Please provide feedback before rejecting.");
      return;
    }
    setSolutions((prev) =>
      prev.map((s) =>
        s.id === selected.id ? { ...s, status: "Rejected" } : s,
      ),
    );
    setSelected(null);
  };

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Review Solutions</h1>
            <p className={styles.subtitle}>
              Evaluate and provide feedback on student submissions
            </p>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => onNavigate("vendor-dashboard")}
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* ── Left: solution list ── */}
            <aside className={styles.sidebar}>
              <h2 className={styles.sideTitle}>
                Submissions
                <span className={styles.count}>{solutions.length}</span>
              </h2>
              <div className={styles.solutionList}>
                {solutions.map((sol) => (
                  <div
                    key={sol.id}
                    className={`${styles.solutionCard} ${selected?.id === sol.id ? styles.solutionSelected : ""}`}
                    onClick={() => handleSelect(sol)}
                  >
                    <h3 className={styles.solTitle}>{sol.problemTitle}</h3>
                    <div className={styles.solMeta}>
                      <span>👥 {sol.teamName}</span>
                      <span>📅 {sol.submittedDate}</span>
                    </div>
                    <StatusBadge status={sol.status} />
                  </div>
                ))}
              </div>
            </aside>

            {/* ── Right: review panel ── */}
            <section className={styles.reviewPanel}>
              {!selected ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📋</div>
                  <h3>Select a submission</h3>
                  <p>Click a submission on the left to review it</p>
                </div>
              ) : (
                <>
                  <div className={styles.reviewHeader}>
                    <div>
                      <h2 className={styles.reviewTitle}>
                        {selected.problemTitle}
                      </h2>
                      <p className={styles.reviewTeam}>
                        By {selected.teamName} · Submitted{" "}
                        {selected.submittedDate}
                      </p>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>

                  {/* Solution preview */}
                  <div className={styles.previewBox}>
                    <h4 className={styles.boxTitle}>Solution Overview</h4>
                    <p className={styles.previewText}>{selected.preview}</p>

                    <h5 className={styles.attachHeading}>Attachments</h5>
                    <div className={styles.attachList}>
                      {selected.attachments.map((a) => (
                        <div key={a} className={styles.attachItem}>
                          <span className={styles.attachIcon}>📄</span>
                          <span className={styles.attachName}>{a}</span>
                          <button className={styles.downloadBtn}>
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review form */}
                  {selected.status === "Pending Review" && (
                    <form
                      className={styles.reviewForm}
                      onSubmit={handleApprove}
                    >
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Rating *</label>
                        <StarRating value={rating} onChange={setRating} />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="feedback" className={styles.label}>
                          Feedback *
                        </label>
                        <textarea
                          id="feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className={styles.textarea}
                          rows={5}
                          placeholder="Provide detailed, constructive feedback on the solution…"
                        />
                      </div>

                      {formError && (
                        <p className={styles.errorText}>{formError}</p>
                      )}

                      <div className={styles.formActions}>
                        <button
                          type="button"
                          className={styles.rejectBtn}
                          onClick={handleReject}
                        >
                          Reject Solution
                        </button>
                        <button type="submit" className={styles.approveBtn}>
                          Approve &amp; Pay
                        </button>
                      </div>
                    </form>
                  )}

                  {selected.status !== "Pending Review" && (
                    <div className={styles.alreadyReviewed}>
                      <span>
                        {selected.status === "Approved" ? "✅" : "❌"} This
                        solution has been{" "}
                        <strong>{selected.status.toLowerCase()}</strong>.
                      </span>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewSolutions;
