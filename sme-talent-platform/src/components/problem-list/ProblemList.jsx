import React from "react";
import styles from "./ProblemList.module.css";

const ProblemList = ({ onNavigate }) => {
  const mockProblems = [
    {
      id: 1,
      title: "Marketing Strategy for Local Cafe",
      description:
        "Need a comprehensive marketing strategy to increase foot traffic and online orders",
      deadline: "2023-12-15",
      reward: "$500",
      difficulty: "Medium",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Website Redesign for Small Business",
      description:
        "Looking for a modern, responsive website design for a local retail store",
      deadline: "2023-12-20",
      reward: "$750",
      difficulty: "Hard",
      category: "Web Design",
    },
    {
      id: 3,
      title: "Social Media Campaign for New Product",
      description:
        "Create a social media campaign to launch a new product line",
      deadline: "2023-12-25",
      reward: "$600",
      difficulty: "Easy",
      category: "Social Media",
    },
    {
      id: 4,
      title: "Mobile App UI/UX Improvement",
      description:
        "Improve the user interface and experience of an existing mobile app",
      deadline: "2023-12-30",
      reward: "$800",
      difficulty: "Hard",
      category: "App Development",
    },
    {
      id: 5,
      title: "Logo Design for Startup",
      description: "Design a modern logo for a new tech startup",
      deadline: "2023-12-18",
      reward: "$400",
      difficulty: "Easy",
      category: "Graphic Design",
    },
  ];

  const handleProblemClick = (problem) => {
    onNavigate("submission", { selectedProblem: problem });
  };

  const handleFilter = (category) => {
    // In a real app, this would filter the problems
    console.log(`Filter by category: ${category}`);
  };

  return (
    <div className={styles.problemList}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Available Problems</h1>
          <p className={styles.subtitle}>
            Find real business challenges to solve and earn rewards
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${styles.active}`}
              onClick={() => handleFilter("All")}
            >
              All
            </button>
            <button
              className={styles.filterButton}
              onClick={() => handleFilter("Marketing")}
            >
              Marketing
            </button>
            <button
              className={styles.filterButton}
              onClick={() => handleFilter("Web Design")}
            >
              Web Design
            </button>
            <button
              className={styles.filterButton}
              onClick={() => handleFilter("App Development")}
            >
              App Development
            </button>
            <button
              className={styles.filterButton}
              onClick={() => handleFilter("Graphic Design")}
            >
              Graphic Design
            </button>
          </div>

          <div className={styles.problems}>
            {mockProblems.map((problem) => (
              <div
                key={problem.id}
                className={styles.problemCard}
                onClick={() => handleProblemClick(problem)}
              >
                <div className={styles.problemHeader}>
                  <h3 className={styles.problemTitle}>{problem.title}</h3>
                  <span
                    className={`${styles.difficulty} ${
                      styles[problem.difficulty.toLowerCase()]
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <p className={styles.problemDescription}>
                  {problem.description}
                </p>
                <div className={styles.problemDetails}>
                  <div className={styles.problemDetail}>
                    <span className={styles.detailLabel}>Category:</span>
                    <span className={styles.detailValue}>
                      {problem.category}
                    </span>
                  </div>
                  <div className={styles.problemDetail}>
                    <span className={styles.detailLabel}>Deadline:</span>
                    <span className={styles.detailValue}>
                      {problem.deadline}
                    </span>
                  </div>
                  <div className={styles.problemDetail}>
                    <span className={styles.detailLabel}>Reward:</span>
                    <span className={styles.detailValue}>{problem.reward}</span>
                  </div>
                </div>
                <button className={styles.viewButton}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProblemList;
