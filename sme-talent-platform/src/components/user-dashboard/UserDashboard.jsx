import React from "react";
import styles from "./UserDashboard.module.css";

const UserDashboard = ({ onNavigate }) => {
  const mockProblems = [
    {
      id: 1,
      title: "Marketing Strategy for Local Cafe",
      deadline: "2023-12-15",
      reward: "$500",
    },
    {
      id: 2,
      title: "Website Redesign for Small Business",
      deadline: "2023-12-20",
      reward: "$750",
    },
    {
      id: 3,
      title: "Social Media Campaign for New Product",
      deadline: "2023-12-25",
      reward: "$600",
    },
    {
      id: 4,
      title: "Mobile App UI/UX Improvement",
      deadline: "2023-12-30",
      reward: "$800",
    },
  ];

  const handleProblemClick = (problem) => {
    onNavigate("submission", { selectedProblem: problem });
  };

  const handleCreateTeam = () => {
    onNavigate("team");
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Student Dashboard</h1>
          <div className={styles.userActions}>
            <button className={styles.button} onClick={handleCreateTeam}>
              Create/Join Team
            </button>
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
              <h3 className={styles.statTitle}>Active Problems</h3>
              <p className={styles.statValue}>4</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Submissions Made</h3>
              <p className={styles.statValue}>2</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Earnings</h3>
              <p className={styles.statValue}>$250</p>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Available Problems</h2>
            <div className={styles.problemList}>
              {mockProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={styles.problemCard}
                  onClick={() => handleProblemClick(problem)}
                >
                  <h3 className={styles.problemTitle}>{problem.title}</h3>
                  <div className={styles.problemDetails}>
                    <div className={styles.problemDetail}>
                      <span className={styles.detailLabel}>Deadline:</span>
                      <span className={styles.detailValue}>
                        {problem.deadline}
                      </span>
                    </div>
                    <div className={styles.problemDetail}>
                      <span className={styles.detailLabel}>Reward:</span>
                      <span className={styles.detailValue}>
                        {problem.reward}
                      </span>
                    </div>
                  </div>
                  <button className={styles.viewButton}>View Details</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
