import React, { useState } from "react";
import styles from "./ReviewSolutions.module.css";

const ReviewSolutions = ({ onNavigate }) => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const mockSolutions = [
    {
      id: 1,
      problemTitle: "Marketing Strategy for Local Cafe",
      teamName: "Marketing Mavericks",
      submittedDate: "2023-11-20",
      status: "Pending Review",
      rating: 0,
    },
    {
      id: 2,
      problemTitle: "Website Redesign for Small Business",
      teamName: "Design Dynamos",
      submittedDate: "2023-11-18",
      status: "Pending Review",
      rating: 0,
    },
    {
      id: 3,
      problemTitle: "Social Media Campaign for New Product",
      teamName: "Creative Minds",
      submittedDate: "2023-11-15",
      status: "Approved",
      rating: 5,
    },
  ];

  const handleSelectSolution = (solution) => {
    setSelectedSolution(solution);
    setFeedback("");
    setRating(0);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would submit the review
    console.log("Submitting review:", {
      solutionId: selectedSolution.id,
      feedback,
      rating,
    });

    // Navigate to payment feedback
    onNavigate("payment-feedback", { selectedSolution });
  };

  const renderStars = () => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${star <= rating ? styles.active : ""}`}
            onClick={() => setRating(star)}
          >
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.reviewSolutions}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Review Solutions</h1>
          <p className={styles.subtitle}>
            Evaluate and provide feedback on submitted solutions
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.solutionsList}>
              <h2 className={styles.sectionTitle}>Submitted Solutions</h2>
              <div className={styles.solutions}>
                {mockSolutions.map((solution) => (
                  <div
                    key={solution.id}
                    className={`${styles.solutionCard} ${
                      selectedSolution?.id === solution.id
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleSelectSolution(solution)}
                  >
                    <h3 className={styles.solutionTitle}>
                      {solution.problemTitle}
                    </h3>
                    <div className={styles.solutionDetails}>
                      <div className={styles.solutionDetail}>
                        <span className={styles.detailLabel}>Team:</span>
                        <span className={styles.detailValue}>
                          {solution.teamName}
                        </span>
                      </div>
                      <div className={styles.solutionDetail}>
                        <span className={styles.detailLabel}>Submitted:</span>
                        <span className={styles.detailValue}>
                          {solution.submittedDate}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`${styles.status} ${
                        styles[solution.status.toLowerCase().replace(" ", "-")]
                      }`}
                    >
                      {solution.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSolution && (
              <div className={styles.reviewForm}>
                <h2 className={styles.sectionTitle}>Review Solution</h2>
                <div className={styles.solutionInfo}>
                  <h3 className={styles.solutionTitle}>
                    {selectedSolution.problemTitle}
                  </h3>
                  <p className={styles.solutionTeam}>
                    By: {selectedSolution.teamName}
                  </p>
                </div>

                <div className={styles.solutionContent}>
                  <h4 className={styles.contentTitle}>Solution Content</h4>
                  <div className={styles.contentPreview}>
                    <p>
                      This is a preview of the submitted solution. In a real
                      application, this would display the actual solution
                      content, including any attached files, images, or links.
                    </p>
                    <div className={styles.attachments}>
                      <h5>Attachments:</h5>
                      <div className={styles.attachmentList}>
                        <div className={styles.attachment}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                          <span>Marketing_Strategy.pdf</span>
                        </div>
                        <div className={styles.attachment}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                          <span>Social_Media_Plan.docx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmitReview}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Rating</label>
                    {renderStars()}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="feedback" className={styles.label}>
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className={styles.textarea}
                      rows={5}
                      placeholder="Provide detailed feedback on the solution..."
                      required
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button type="button" className={styles.rejectButton}>
                      Reject Solution
                    </button>
                    <button type="submit" className={styles.approveButton}>
                      Approve & Pay
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewSolutions;
