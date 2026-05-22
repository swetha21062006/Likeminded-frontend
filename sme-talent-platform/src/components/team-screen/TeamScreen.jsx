import React, { useState } from "react";
import styles from "./TeamScreen.module.css";

const MOCK_TEAMS = [
  {
    id: 1,
    name: "Marketing Mavericks",
    members: 3,
    description: "Specialising in digital marketing and brand strategies.",
  },
  {
    id: 2,
    name: "Design Dynamos",
    members: 4,
    description: "Creative team for UI/UX and graphic design projects.",
  },
  {
    id: 3,
    name: "Code Crusaders",
    members: 2,
    description: "Full-stack development and API integration experts.",
  },
  {
    id: 4,
    name: "Data Detectives",
    members: 3,
    description: "Analytics, machine learning, and data storytelling.",
  },
];

const TeamScreen = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [success, setSuccess] = useState("");
  const [requestedId, setRequestedId] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    setSuccess(
      `Team "${teamName}" created! Your invite code is: ${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    );
    setTeamName("");
    setTeamDesc("");
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setSuccess(`Successfully joined the team with code "${joinCode}"!`);
    setJoinCode("");
    setTimeout(() => onNavigate("user-dashboard"), 1500);
  };

  const handleRequest = (id) => {
    setRequestedId(id);
  };

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Team Management</h1>
            <p className={styles.subtitle}>
              Create or join a team to collaborate on problems
            </p>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => onNavigate("user-dashboard")}
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {["create", "join", "browse"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSuccess("");
                }}
              >
                {tab === "create"
                  ? "Create Team"
                  : tab === "join"
                    ? "Join Team"
                    : "Browse Teams"}
              </button>
            ))}
          </div>

          {/* ── Create ── */}
          {activeTab === "create" && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Create a New Team</h2>
              <p className={styles.panelDesc}>
                Set up your team and invite others using the generated code.
              </p>

              {success && <div className={styles.successBox}>{success}</div>}

              <form className={styles.form} onSubmit={handleCreate}>
                <div className={styles.formGroup}>
                  <label htmlFor="teamName" className={styles.label}>
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. Marketing Mavericks"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="teamDesc" className={styles.label}>
                    Team Description *
                  </label>
                  <textarea
                    id="teamDesc"
                    value={teamDesc}
                    onChange={(e) => setTeamDesc(e.target.value)}
                    className={styles.textarea}
                    rows={4}
                    placeholder="Describe your team's skills and focus areas…"
                    required
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Create Team
                </button>
              </form>
            </div>
          )}

          {/* ── Join ── */}
          {activeTab === "join" && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Join an Existing Team</h2>
              <p className={styles.panelDesc}>
                Enter the invite code shared by your team leader.
              </p>

              {success && <div className={styles.successBox}>{success}</div>}

              <form className={styles.form} onSubmit={handleJoin}>
                <div className={styles.formGroup}>
                  <label htmlFor="joinCode" className={styles.label}>
                    Invite Code *
                  </label>
                  <input
                    type="text"
                    id="joinCode"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className={styles.input}
                    placeholder="e.g. XK9QR2"
                    maxLength={8}
                    required
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Join Team
                </button>
              </form>
            </div>
          )}

          {/* ── Browse ── */}
          {activeTab === "browse" && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Browse Open Teams</h2>
              <p className={styles.panelDesc}>
                Find a team that matches your skills and send a join request.
              </p>
              <div className={styles.teamGrid}>
                {MOCK_TEAMS.map((team) => (
                  <div key={team.id} className={styles.teamCard}>
                    <div className={styles.teamAvatar}>
                      {team.name.charAt(0)}
                    </div>
                    <div className={styles.teamInfo}>
                      <h3 className={styles.teamName}>{team.name}</h3>
                      <p className={styles.teamDesc}>{team.description}</p>
                      <div className={styles.teamFooter}>
                        <span className={styles.memberCount}>
                          👥 {team.members} members
                        </span>
                        <button
                          className={`${styles.requestBtn} ${requestedId === team.id ? styles.requestSent : ""}`}
                          onClick={() => handleRequest(team.id)}
                          disabled={requestedId === team.id}
                        >
                          {requestedId === team.id
                            ? "✓ Requested"
                            : "Request to Join"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamScreen;
