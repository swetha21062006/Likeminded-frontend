import React, { useState, useRef, useEffect } from "react";
import styles from "./UserDashboard.module.css";

const MOCK_PROBLEMS = [
  { id: 1, title: "Marketing Strategy for Local Cafe",      deadline: "2023-12-15", reward: "$500", difficulty: "Medium",  category: "Marketing"    },
  { id: 2, title: "Website Redesign for Small Business",    deadline: "2023-12-20", reward: "$750", difficulty: "Hard",    category: "Design"       },
  { id: 3, title: "Social Media Campaign for New Product",  deadline: "2023-12-25", reward: "$600", difficulty: "Easy",    category: "Marketing"    },
  { id: 4, title: "Mobile App UI/UX Improvement",           deadline: "2023-12-30", reward: "$800", difficulty: "Hard",    category: "Design"       },
  { id: 5, title: "API Development for E-commerce",         deadline: "2024-01-05", reward: "$900", difficulty: "Hard",    category: "Development"  },
  { id: 6, title: "Brand Identity Design",                  deadline: "2023-12-28", reward: "$650", difficulty: "Medium",  category: "Design"       },
  { id: 7, title: "Content Marketing Strategy",             deadline: "2024-01-02", reward: "$550", difficulty: "Easy",    category: "Marketing"    },
  { id: 8, title: "Database Optimization",                  deadline: "2024-01-10", reward: "$700", difficulty: "Hard",    category: "Development"  },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Submitted solution", problem: "Marketing Strategy",  date: "2 hours ago",  status: "pending"   },
  { id: 2, action: "Joined team",        problem: "Design Dynamos",      date: "1 day ago",    status: "completed" },
  { id: 3, action: "Completed problem",  problem: "Logo Design",         date: "3 days ago",   status: "completed" },
  { id: 4, action: "Received review",    problem: "Website Redesign",    date: "5 days ago",   status: "completed" },
];

const SKILLS = [
  { name: "React",        level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "Marketing",    level: 75 },
  { name: "Python",       level: 70 },
  { name: "Data Analysis",level: 65 },
];

const ACHIEVEMENTS = [
  { id: 1, name: "Problem Solver",     icon: "🏆", description: "Solved 10+ problems",            earned: true  },
  { id: 2, name: "Team Player",        icon: "🤝", description: "Collaborated on 5+ team projects", earned: true  },
  { id: 3, name: "Rising Star",        icon: "⭐", description: "Received 4.5+ average rating",    earned: true  },
  { id: 4, name: "Expert Contributor", icon: "🎯", description: "Solved 25+ problems",             earned: false },
];

const FILTERS = ["All", "Marketing", "Design", "Development"];

// Generate up-to-2-letter initials from a display name or email
const getInitials = (displayName, email) => {
  if (displayName) {
    return displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
};

const UserDashboard = ({ onNavigate, currentUser }) => {
  const [activeTab, setActiveTab]       = useState("overview");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const profileRef = useRef(null);

  // Derive display values from currentUser prop
  const displayName = currentUser?.displayName || null;
  const email       = currentUser?.email || "";
  const initials    = getInitials(displayName, email);
  // Show name if available, otherwise show email
  const profileLabel    = displayName || email || "Student";
  const profileSubLabel = displayName ? email : "Computer Science";

  const filteredProblems =
    selectedFilter === "All"
      ? MOCK_PROBLEMS
      : MOCK_PROBLEMS.filter((p) => p.category === selectedFilter);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Student Dashboard</h1>
            <button className={styles.button} onClick={() => onNavigate("team")}>
              Create/Join Team
            </button>
          </div>

          <div className={styles.headerProfile} ref={profileRef}>
            <button
              className={styles.profileTrigger}
              onClick={() => setIsProfileOpen((o) => !o)}
            >
              <div className={styles.profileAvatar}>
                <span>{initials}</span>
                <div className={styles.statusIndicator} />
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>{profileLabel}</span>
                <span className={styles.profileMeta}>{profileSubLabel}</span>
              </div>
              <svg
                className={`${styles.arrow} ${isProfileOpen ? styles.arrowUp : ""}`}
                width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className={styles.profilePanel}>
                {/* Panel header */}
                <div className={styles.panelHeader}>
                  <div className={styles.panelAvatar}><span>{initials}</span></div>
                  <div>
                    <h3 className={styles.panelName}>{profileLabel}</h3>
                    <p className={styles.panelEmail}>{email}</p>
                    <p className={styles.panelRole}>Computer Science Student</p>
                  </div>
                </div>

                {/* Mini stats */}
                <div className={styles.panelStats}>
                  {[["12", "Problems"], ["4.8", "Rating"], ["8", "Teams"]].map(([val, label]) => (
                    <div key={label} className={styles.panelStat}>
                      <span className={styles.statNum}>{val}</span>
                      <span className={styles.statLbl}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className={styles.panelTabs}>
                  {["overview", "skills", "achievements"].map((tab) => (
                    <button
                      key={tab}
                      className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className={styles.tabContent}>
                  {activeTab === "overview" && (
                    <>
                      <p className={styles.aboutText}>
                        Passionate CS student focused on web development and UI/UX design. Love solving real-world problems and collaborating with diverse teams.
                      </p>
                      <h4 className={styles.subHeading}>Recent Activity</h4>
                      {RECENT_ACTIVITY.slice(0, 3).map((a) => (
                        <div key={a.id} className={styles.activityItem}>
                          <span className={`${styles.dot} ${styles[a.status]}`} />
                          <div>
                            <p className={styles.actAction}>{a.action}</p>
                            <p className={styles.actProblem}>{a.problem}</p>
                            <p className={styles.actDate}>{a.date}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {activeTab === "skills" && (
                    <>
                      <h4 className={styles.subHeading}>Skills &amp; Expertise</h4>
                      {SKILLS.map((s) => (
                        <div key={s.name} className={styles.skillItem}>
                          <div className={styles.skillRow}>
                            <span className={styles.skillName}>{s.name}</span>
                            <span className={styles.skillPct}>{s.level}%</span>
                          </div>
                          <div className={styles.skillBar}>
                            <div className={styles.skillFill} style={{ width: `${s.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {activeTab === "achievements" && (
                    <>
                      <h4 className={styles.subHeading}>Achievements</h4>
                      {ACHIEVEMENTS.map((a) => (
                        <div key={a.id} className={`${styles.achieveItem} ${a.earned ? styles.earned : styles.locked}`}>
                          <span className={styles.achieveIcon}>{a.icon}</span>
                          <div>
                            <p className={styles.achieveName}>{a.name}</p>
                            <p className={styles.achieveDesc}>{a.description}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Quick actions */}
                <div className={styles.panelActions}>
                  <button className={styles.actionBtn} onClick={() => setIsProfileOpen(false)}>My Profile</button>
                  <button className={styles.actionBtn} onClick={() => { setIsProfileOpen(false); onNavigate("team"); }}>My Team</button>
                  <button className={styles.actionBtn} onClick={() => setIsProfileOpen(false)}>Submissions</button>
                  <button className={`${styles.actionBtn} ${styles.logoutBtn}`} onClick={() => onNavigate("landing")}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.stats}>
            {[
              { label: "Active Problems",  value: filteredProblems.length, icon: "📋" },
              { label: "Submissions Made", value: 2,                       icon: "📄" },
              { label: "Earnings",         value: "$250",                  icon: "💵" },
              { label: "Team Members",     value: 8,                       icon: "👥" },
            ].map((s) => (
              <div key={s.label} className={styles.statCard}>
                <div className={styles.statIcon}>{s.icon}</div>
                <h3 className={styles.statTitle}>{s.label}</h3>
                <p className={styles.statValue}>{s.value}</p>
              </div>
            ))}
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Available Problems</h2>
              <div className={styles.filterGroup}>
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`${styles.filterBtn} ${selectedFilter === f ? styles.filterActive : ""}`}
                    onClick={() => setSelectedFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.problemGrid}>
              {filteredProblems.map((p) => (
                <div
                  key={p.id}
                  className={styles.problemCard}
                  onClick={() => onNavigate("submission", { selectedProblem: p })}
                >
                  <div className={styles.cardTop}>
                    <h3 className={styles.problemTitle}>{p.title}</h3>
                    <span className={`${styles.badge} ${styles[p.difficulty.toLowerCase()]}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <div className={styles.problemMeta}>
                    <div className={styles.metaRow}><span>Deadline</span><span>{p.deadline}</span></div>
                    <div className={styles.metaRow}><span>Reward</span><span>{p.reward}</span></div>
                    <div className={styles.metaRow}><span>Category</span><span>{p.category}</span></div>
                  </div>
                  <button className={styles.viewBtn}>View Details</button>
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