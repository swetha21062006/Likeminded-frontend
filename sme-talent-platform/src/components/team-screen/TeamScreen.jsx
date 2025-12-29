import React, { useState } from "react";
import styles from "./TeamScreen.module.css";

const TeamScreen = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const mockTeams = [
    {
      id: 1,
      name: "Marketing Mavericks",
      members: 3,
      description: "Specializing in digital marketing strategies",
    },
    {
      id: 2,
      name: "Design Dynamos",
      members: 4,
      description: "Creative team for UI/UX and graphic design",
    },
    {
      id: 3,
      name: "Code Crusaders",
      members: 2,
      description: "Full-stack development team",
    },
  ];

  const handleCreateTeam = (e) => {
    e.preventDefault();
    // In a real app, this would create a team
    console.log("Creating team:", { teamName, teamDescription });
    onNavigate("user-dashboard");
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    // In a real app, this would join a team
    console.log("Joining team with code:", joinCode);
    onNavigate("user-dashboard");
  };

  return (
    <div className={styles.teamScreen}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Team Management</h1>
          <p className={styles.subtitle}>
            Create or join a team to collaborate on problems
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "create" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Team
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "join" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("join")}
            >
              Join Team
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "browse" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("browse")}
            >
              Browse Teams
            </button>
          </div>

          {activeTab === "create" && (
            <div className={styles.tabContent}>
              <form className={styles.form} onSubmit={handleCreateTeam}>
                <div className={styles.formGroup}>
                  <label htmlFor="teamName" className={styles.label}>
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="teamDescription" className={styles.label}>
                    Team Description
                  </label>
                  <textarea
                    id="teamDescription"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    className={styles.textarea}
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className={styles.button}>
                  Create Team
                </button>
              </form>
            </div>
          )}

          {activeTab === "join" && (
            <div className={styles.tabContent}>
              <form className={styles.form} onSubmit={handleJoinTeam}>
                <div className={styles.formGroup}>
                  <label htmlFor="joinCode" className={styles.label}>
                    Team Code
                  </label>
                  <input
                    type="text"
                    id="joinCode"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className={styles.input}
                    placeholder="Enter the team code provided by the team leader"
                    required
                  />
                </div>

                <button type="submit" className={styles.button}>
                  Join Team
                </button>
              </form>
            </div>
          )}

          {activeTab === "browse" && (
            <div className={styles.tabContent}>
              <div className={styles.teamList}>
                {mockTeams.map((team) => (
                  <div key={team.id} className={styles.teamCard}>
                    <h3 className={styles.teamName}>{team.name}</h3>
                    <p className={styles.teamDescription}>{team.description}</p>
                    <div className={styles.teamDetails}>
                      <span className={styles.teamMembers}>
                        {team.members} members
                      </span>
                      <button className={styles.requestButton}>
                        Request to Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className={styles.backButton}
            onClick={() => onNavigate("user-dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default TeamScreen;
