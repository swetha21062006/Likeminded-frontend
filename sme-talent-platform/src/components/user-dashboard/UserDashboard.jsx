import React, { useState, useRef, useEffect } from "react";
import styles from "./UserDashboard.module.css";

const UserDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const profileRef = useRef(null);

  const mockProblems = [
    {
      id: 1,
      title: "Marketing Strategy for Local Cafe",
      deadline: "2023-12-15",
      reward: "$500",
      difficulty: "Medium",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Website Redesign for Small Business",
      deadline: "2023-12-20",
      reward: "$750",
      difficulty: "Hard",
      category: "Design",
    },
    {
      id: 3,
      title: "Social Media Campaign for New Product",
      deadline: "2023-12-25",
      reward: "$600",
      difficulty: "Easy",
      category: "Marketing",
    },
    {
      id: 4,
      title: "Mobile App UI/UX Improvement",
      deadline: "2023-12-30",
      reward: "$800",
      difficulty: "Hard",
      category: "Design",
    },
    {
      id: 5,
      title: "API Development for E-commerce",
      deadline: "2024-01-05",
      reward: "$900",
      difficulty: "Hard",
      category: "Development",
    },
    {
      id: 6,
      title: "Brand Identity Design",
      deadline: "2023-12-28",
      reward: "$650",
      difficulty: "Medium",
      category: "Design",
    },
    {
      id: 7,
      title: "Content Marketing Strategy",
      deadline: "2024-01-02",
      reward: "$550",
      difficulty: "Easy",
      category: "Marketing",
    },
    {
      id: 8,
      title: "Database Optimization",
      deadline: "2024-01-10",
      reward: "$700",
      difficulty: "Hard",
      category: "Development",
    },
  ];

  const filteredProblems =
    selectedFilter === "All"
      ? mockProblems
      : mockProblems.filter((problem) => problem.category === selectedFilter);

  const handleProblemClick = (problem) => {
    onNavigate("submission", { selectedProblem: problem });
  };

  const handleCreateTeam = () => {
    onNavigate("team");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const recentActivity = [
    {
      id: 1,
      action: "Submitted solution",
      problem: "Marketing Strategy",
      date: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      action: "Joined team",
      problem: "Design Dynamos",
      date: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      action: "Completed problem",
      problem: "Logo Design",
      date: "3 days ago",
      status: "completed",
    },
    {
      id: 4,
      action: "Received review",
      problem: "Website Redesign",
      date: "5 days ago",
      status: "completed",
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "Problem Solver",
      icon: "🏆",
      description: "Solved 10+ problems",
      earned: true,
    },
    {
      id: 2,
      name: "Team Player",
      icon: "🤝",
      description: "Collaborated on 5+ team projects",
      earned: true,
    },
    {
      id: 3,
      name: "Rising Star",
      icon: "⭐",
      description: "Received 4.5+ average rating",
      earned: true,
    },
    {
      id: 4,
      name: "Expert Contributor",
      icon: "🎯",
      description: "Solved 25+ problems",
      earned: false,
    },
  ];

  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "UI/UX Design", level: 85, category: "Design" },
    { name: "Marketing", level: 75, category: "Marketing" },
    { name: "Python", level: 70, category: "Backend" },
    { name: "Data Analysis", level: 65, category: "Analytics" },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Enhanced Header with Profile */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Student Dashboard</h1>
            <div className={styles.headerActions}>
              <button className={styles.button} onClick={handleCreateTeam}>
                Create/Join Team
              </button>
            </div>
          </div>

          {/* Profile Section in Header */}
          <div className={styles.headerProfile} ref={profileRef}>
            <button
              className={styles.profileTrigger}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className={styles.profileAvatar}>
                <span>JS</span>
                <div className={styles.statusIndicator}></div>
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>John Smith</span>
                <span className={styles.profileTitle}>Computer Science</span>
              </div>
              <svg
                className={`${styles.dropdownArrow} ${
                  isProfileOpen ? styles.arrowUp : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Extended Profile Panel */}
            {isProfileOpen && (
              <div className={styles.profilePanel}>
                <div className={styles.profilePanelHeader}>
                  <div className={styles.panelAvatar}>
                    <span>JS</span>
                    <div className={styles.statusIndicator}></div>
                  </div>
                  <div className={styles.panelUserInfo}>
                    <h3 className={styles.panelName}>John Smith</h3>
                    <p className={styles.panelEmail}>
                      john.smith@university.edu
                    </p>
                    <p className={styles.panelTitle}>
                      Computer Science Student
                    </p>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className={styles.panelStats}>
                  <div className={styles.panelStat}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11H3v10h6V11z"></path>
                      <path d="M21 3h-6v18h6V3z"></path>
                      <path d="M15 7H9v14h6V7z"></path>
                    </svg>
                    <div>
                      <span className={styles.statNumber}>12</span>
                      <span className={styles.statLabel}>Problems</span>
                    </div>
                  </div>
                  <div className={styles.panelStat}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <div>
                      <span className={styles.statNumber}>4.8</span>
                      <span className={styles.statLabel}>Rating</span>
                    </div>
                  </div>
                  <div className={styles.panelStat}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div>
                      <span className={styles.statNumber}>8</span>
                      <span className={styles.statLabel}>Teams</span>
                    </div>
                  </div>
                </div>

                {/* Profile Tabs */}
                <div className={styles.profileTabs}>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "overview" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "skills" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("skills")}
                  >
                    Skills
                  </button>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === "achievements" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("achievements")}
                  >
                    Achievements
                  </button>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {activeTab === "overview" && (
                    <div className={styles.overviewTab}>
                      <div className={styles.infoSection}>
                        <h4 className={styles.sectionTitle}>About</h4>
                        <p className={styles.aboutText}>
                          Passionate computer science student with a focus on
                          web development and UI/UX design. Love solving
                          real-world problems and collaborating with diverse
                          teams.
                        </p>
                      </div>

                      <div className={styles.infoSection}>
                        <h4 className={styles.sectionTitle}>Recent Activity</h4>
                        <div className={styles.activityList}>
                          {recentActivity.slice(0, 3).map((activity) => (
                            <div
                              key={activity.id}
                              className={styles.activityItem}
                            >
                              <div
                                className={`${styles.activityDot} ${
                                  styles[activity.status]
                                }`}
                              ></div>
                              <div className={styles.activityContent}>
                                <p className={styles.activityText}>
                                  {activity.action}
                                </p>
                                <p className={styles.activityProblem}>
                                  {activity.problem}
                                </p>
                                <p className={styles.activityDate}>
                                  {activity.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "skills" && (
                    <div className={styles.skillsTab}>
                      <h4 className={styles.sectionTitle}>
                        Skills & Expertise
                      </h4>
                      <div className={styles.skillsList}>
                        {skills.slice(0, 4).map((skill, index) => (
                          <div key={index} className={styles.skillItem}>
                            <div className={styles.skillHeader}>
                              <span className={styles.skillName}>
                                {skill.name}
                              </span>
                              <span className={styles.skillLevel}>
                                {skill.level}%
                              </span>
                            </div>
                            <div className={styles.skillBar}>
                              <div
                                className={styles.skillFill}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "achievements" && (
                    <div className={styles.achievementsTab}>
                      <h4 className={styles.sectionTitle}>
                        Recent Achievements
                      </h4>
                      <div className={styles.achievementsList}>
                        {achievements.slice(0, 3).map((achievement) => (
                          <div
                            key={achievement.id}
                            className={`${styles.achievementItem} ${
                              achievement.earned ? styles.earned : styles.locked
                            }`}
                          >
                            <div className={styles.achievementIcon}>
                              {achievement.icon}
                            </div>
                            <div className={styles.achievementInfo}>
                              <h5 className={styles.achievementName}>
                                {achievement.name}
                              </h5>
                              <p className={styles.achievementDescription}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={styles.panelActions}>
                  <button className={styles.actionBtn}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    My Profile
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={handleCreateTeam}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                      <line x1="23" y1="7" x2="17" y2="7"></line>
                      <line x1="23" y1="15" x2="17" y2="15"></line>
                    </svg>
                    Manage Team
                  </button>
                  <button className={styles.actionBtn}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="9 3 9 8 15 8"></polyline>
                    </svg>
                    My Submissions
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.logoutBtn}`}
                    onClick={() => onNavigate("landing")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Full Width Now */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3 className={styles.statTitle}>Active Problems</h3>
              <p className={styles.statValue}>{filteredProblems.length}</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <h3 className={styles.statTitle}>Submissions Made</h3>
              <p className={styles.statValue}>2</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className={styles.statTitle}>Earnings</h3>
              <p className={styles.statValue}>$250</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className={styles.statTitle}>Team Members</h3>
              <p className={styles.statValue}>8</p>
            </div>
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Available Problems</h2>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterBtn} ${
                    selectedFilter === "All" ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedFilter("All")}
                >
                  All
                </button>
                <button
                  className={`${styles.filterBtn} ${
                    selectedFilter === "Marketing" ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedFilter("Marketing")}
                >
                  Marketing
                </button>
                <button
                  className={`${styles.filterBtn} ${
                    selectedFilter === "Design" ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedFilter("Design")}
                >
                  Design
                </button>
                <button
                  className={`${styles.filterBtn} ${
                    selectedFilter === "Development" ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedFilter("Development")}
                >
                  Development
                </button>
              </div>
            </div>
            <div className={styles.problemList}>
              {filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={styles.problemCard}
                  onClick={() => handleProblemClick(problem)}
                >
                  <div className={styles.problemHeader}>
                    <h3 className={styles.problemTitle}>{problem.title}</h3>
                    <span
                      className={`${styles.difficultyBadge} ${
                        styles[problem.difficulty.toLowerCase()]
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
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
                    <div className={styles.problemDetail}>
                      <span className={styles.detailLabel}>Category:</span>
                      <span className={styles.detailValue}>
                        {problem.category}
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
