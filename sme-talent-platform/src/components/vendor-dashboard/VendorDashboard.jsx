import React, { useState, useRef, useEffect } from "react";

/* ── Mock Data ── */
const MOCK_PROBLEMS = [
  { id: 1, title: "Marketing Strategy for Local Cafe",     status: "Open",      submissions: 3 },
  { id: 2, title: "Website Redesign for Small Business",   status: "In Review", submissions: 5 },
  { id: 3, title: "Social Media Campaign for New Product", status: "Closed",    submissions: 8 },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Posted new problem",  detail: "Marketing Strategy for Local Cafe", date: "2 hours ago",  status: "active"    },
  { id: 2, action: "Solution approved",   detail: "Website Redesign",                  date: "1 day ago",    status: "completed" },
  { id: 3, action: "Payment released",    detail: "Social Media Campaign",             date: "3 days ago",   status: "completed" },
  { id: 4, action: "New submission",      detail: "API Development",                   date: "5 days ago",   status: "pending"   },
];

const PANEL_STATS = [
  { value: "3",     label: "Problems"    },
  { value: "16",    label: "Submissions" },
  { value: "$1.2k", label: "Paid Out"   },
];

const STATUS_META = {
  Open:      { bg: "#dcfce7", color: "#16a34a" },
  "In Review": { bg: "#fef3c7", color: "#d97706" },
  Closed:    { bg: "#fee2e2", color: "#dc2626" },
};

/* ── Styles ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; }

  .dashboard {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* ── Header ── */
  .header {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(10px);
    padding: 0.875rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
    border-image-slice: 1;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  .headerInner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerTitle {
    font-size: 1.75rem;
    font-weight: 800;
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Profile trigger ── */
  .profileWrapper { position: relative; }
  .profileTrigger {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.4rem 0.75rem 0.4rem 0.4rem;
    background: rgba(102,126,234,0.08);
    border: 1.5px solid rgba(102,126,234,0.2);
    border-radius: 0.625rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    font-family: 'DM Sans', sans-serif;
    outline: none;
  }
  .profileTrigger:hover, .profileTrigger.open {
    background: rgba(102,126,234,0.15);
    border-color: rgba(102,126,234,0.35);
  }
  .avatar {
    position: relative;
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg,#667eea,#764ba2);
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 700;
    border: 2px solid rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
  .onlineDot {
    position: absolute; bottom: 0; right: 0;
    width: 10px; height: 10px;
    background: #10b981; border-radius: 50%;
    border: 2px solid white;
  }
  .triggerInfo { display: flex; flex-direction: column; align-items: flex-start; }
  .triggerName { font-size: 0.8rem; font-weight: 700; color: #1e293b; line-height: 1.2; }
  .triggerRole { font-size: 0.7rem; color: #64748b; }
  .arrow { color: #64748b; transition: transform 0.2s; }
  .arrow.up { transform: rotate(180deg); }

  /* ── Profile panel ── */
  .profilePanel {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 380px;
    background: white;
    border-radius: 0.875rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    overflow: hidden;
    animation: slideDown 0.25s ease-out;
    z-index: 200;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .panelHeader {
    background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    overflow: hidden;
  }
  .panelHeader::after {
    content: "";
    position: absolute;
    width: 140px; height: 140px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    top: -40px; right: -40px;
    pointer-events: none;
  }
  .panelAvatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; font-weight: 700;
    border: 2px solid rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
  .panelInfo { flex: 1; min-width: 0; }
  .panelName  { font-size: 1rem; font-weight: 700; color: white; margin: 0 0 0.15rem; }
  .panelEmail { font-size: 0.8rem; color: rgba(255,255,255,0.85); margin: 0 0 0.4rem; }
  .panelBadge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    color: white;
    font-size: 0.65rem; font-weight: 700;
    padding: 0.15rem 0.55rem;
    border-radius: 9999px;
    text-transform: uppercase; letter-spacing: 0.5px;
    border: 1px solid rgba(255,255,255,0.3);
  }

  .statsStrip {
    display: flex;
    justify-content: space-around;
    padding: 0.875rem 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
  }
  .stripStat { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
  .stripVal  { font-size: 1.1rem; font-weight: 800; color: #1e293b; }
  .stripLbl  { font-size: 0.7rem; color: #64748b; }

  .panelTabs { display: flex; border-bottom: 1px solid #e5e7eb; }
  .tabBtn {
    flex: 1; padding: 0.6rem;
    background: none; border: none;
    font-size: 0.8rem; font-weight: 600; color: #64748b;
    cursor: pointer; position: relative; transition: color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .tabBtn:hover { color: #805ad5; }
  .tabBtn.active { color: #805ad5; }
  .tabBtn.active::after {
    content: "";
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg,#f093fb,#f5576c);
  }

  .tabContent { padding: 1rem; max-height: 260px; overflow-y: auto; }
  .subHeading { font-size: 0.8rem; font-weight: 700; color: #374151; margin: 0 0 0.5rem; }
  .aboutText  { font-size: 0.8rem; color: #4b5563; line-height: 1.6; margin: 0 0 1rem; }

  .infoList { display: flex; flex-direction: column; gap: 0.5rem; }
  .infoRow {
    display: flex; align-items: center; gap: 0.625rem;
    padding: 0.45rem 0.625rem;
    background: #f8fafc; border-radius: 0.375rem;
    transition: background 0.15s;
  }
  .infoRow:hover { background: #f0f9ff; }
  .infoIcon { font-size: 0.9rem; flex-shrink: 0; }
  .infoText { display: flex; flex-direction: column; gap: 0.05rem; min-width: 0; }
  .infoLabel2 { font-size: 0.68rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px; }
  .infoValue2 { font-size: 0.78rem; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .activityItem { display: flex; gap: 0.5rem; margin-bottom: 0.6rem; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 0.3rem; }
  .dot.active    { background: #3b82f6; }
  .dot.pending   { background: #f59e0b; }
  .dot.completed { background: #10b981; }
  .actAction { font-size: 0.78rem; font-weight: 600; color: #1e293b; margin: 0; }
  .actDetail { font-size: 0.75rem; color: #805ad5; margin: 0; }
  .actDate   { font-size: 0.7rem; color: #9ca3af; margin: 0; }

  .panelActions {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;
    padding: 0.875rem; background: #f8fafc; border-top: 1px solid #e5e7eb;
  }
  .actionBtn {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    padding: 0.5rem; background: white;
    border: 1.5px solid #d1d5db; border-radius: 0.375rem;
    font-size: 0.75rem; font-weight: 600; color: #374151;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .actionBtn:hover { background: #f3f4f6; color: #805ad5; border-color: #a78bfa; }
  .logoutBtn { color: #dc2626; border-color: #fca5a5; }
  .logoutBtn:hover { background: #fef2f2; color: #dc2626; border-color: #f87171; }

  /* ── Main ── */
  .main { flex: 1; padding: 2rem 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

  /* Stats */
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 1.25rem; margin-bottom: 2rem; }
  .statCard {
    background: white; border-radius: 1rem; padding: 1.5rem;
    text-align: center; position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    animation: fadeInUp 0.4s ease-out both;
  }
  .statCard::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
  }
  .statCard:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.12); }
  .statIcon  { font-size: 1.5rem; margin-bottom: 0.4rem; }
  .statTitle { font-size: 0.9rem; color: #64748b; margin: 0 0 0.5rem; font-weight: 500; }
  .statValue {
    font-size: 2rem; font-weight: 800; margin: 0;
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* CTA */
  .actions { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
  .ctaBtn {
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
    color: white; border: none; border-radius: 0.625rem;
    padding: 0.75rem 2rem; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(245,87,108,0.3); font-family: 'DM Sans', sans-serif;
  }
  .ctaBtn:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(245,87,108,0.4); }
  .ctaBtnOutline {
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.6);
    box-shadow: none;
  }
  .ctaBtnOutline:hover { background: rgba(255,255,255,0.25); box-shadow: none; transform: translateY(-3px); }

  /* Problems */
  .section { margin-bottom: 2rem; }
  .sectionTitle {
    font-size: 1.4rem; font-weight: 800; margin: 0 0 1.25rem;
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .problemGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 1.25rem; }
  .problemCard {
    background: rgba(255,255,255,0.9); border-radius: 1rem; padding: 1.5rem;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    animation: fadeInUp 0.4s ease-out both;
  }
  .problemCard::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg,#f093fb 0%,#f5576c 100%);
  }
  .problemCard:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.12); }
  .problemTitle { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0 0 1rem; }
  .metaRow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
  .metaLabel { font-size: 0.85rem; font-weight: 500; color: #64748b; }
  .metaValue { font-size: 0.85rem; font-weight: 700; color: #1e293b; }
  .statusBadge {
    font-size: 0.72rem; font-weight: 700;
    padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;
  }
  .cardActions { display: flex; gap: 0.5rem; margin-top: 1rem; }
  .smallBtn {
    background: #f3f0ff; color: #805ad5; border: none;
    border-radius: 0.375rem; padding: 0.4rem 0.875rem;
    font-size: 0.8rem; font-weight: 700; cursor: pointer;
    transition: all 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .smallBtn:hover { background: #e9d5ff; transform: translateY(-1px); }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .problemGrid { grid-template-columns: 1fr; }
    .stats { grid-template-columns: 1fr 1fr; }
    .actions { flex-direction: column; align-items: stretch; }
    .profilePanel { width: min(380px, calc(100vw - 2rem)); right: -0.5rem; }
    .triggerInfo { display: none; }
  }
`;

const getInitials = (displayName, email) => {
  if (displayName) return displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "V";
};

const TABS = ["overview", "activity"];

export default function VendorDashboard({ onNavigate = () => {}, currentUser }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const wrapperRef = useRef(null);
  const totalSubmissions = MOCK_PROBLEMS.reduce((a, p) => a + p.submissions, 0);

  const displayName  = currentUser?.displayName || null;
  const email        = currentUser?.email || "";
  const initials     = getInitials(displayName, email);
  const profileLabel = displayName || email || "Vendor";

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="dashboard">

        {/* ── Header ── */}
        <header className="header">
          <div className="headerInner">
            <h1 className="headerTitle">Vendor Dashboard</h1>

            {/* Profile trigger + panel */}
            <div className="profileWrapper" ref={wrapperRef}>
              <button
                className={`profileTrigger${panelOpen ? " open" : ""}`}
                onClick={() => setPanelOpen((o) => !o)}
              >
                <div className="avatar">
                  <span>{initials}</span>
                  <div className="onlineDot" />
                </div>
                <div className="triggerInfo">
                  <span className="triggerName">{profileLabel}</span>
                  <span className="triggerRole">Business Account</span>
                </div>
                <svg className={`arrow${panelOpen ? " up" : ""}`} width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {panelOpen && (
                <div className="profilePanel">
                  {/* Header */}
                  <div className="panelHeader">
                    <div className="panelAvatar"><span>{initials}</span></div>
                    <div className="panelInfo">
                      <h3 className="panelName">{profileLabel}</h3>
                      <p className="panelEmail">{email}</p>
                      <span className="panelBadge">Vendor</span>
                    </div>
                  </div>

                  {/* Stats strip */}
                  <div className="statsStrip">
                    {PANEL_STATS.map(({ value, label }) => (
                      <div key={label} className="stripStat">
                        <span className="stripVal">{value}</span>
                        <span className="stripLbl">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tabs */}
                  <div className="panelTabs">
                    {TABS.map((tab) => (
                      <button
                        key={tab}
                        className={`tabBtn${activeTab === tab ? " active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="tabContent">
                    {activeTab === "overview" && (
                      <>
                        <p className="aboutText">
                          {profileLabel} posts real business challenges and connects with innovative student talent through the SME Platform.
                        </p>
                        <div className="infoList">
                          {[
                            { icon: "✉️", label: "Email",  value: email },
                            { icon: "🏢", label: "Type",   value: "Business / SME" },
                            { icon: "📍", label: "Status", value: "Active Vendor" },
                          ].map(({ icon, label, value }) => (
                            <div key={label} className="infoRow">
                              <span className="infoIcon">{icon}</span>
                              <div className="infoText">
                                <span className="infoLabel2">{label}</span>
                                <span className="infoValue2">{value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === "activity" && (
                      <>
                        <h4 className="subHeading">Recent Activity</h4>
                        {RECENT_ACTIVITY.map((a) => (
                          <div key={a.id} className="activityItem">
                            <span className={`dot ${a.status}`} />
                            <div>
                              <p className="actAction">{a.action}</p>
                              <p className="actDetail">{a.detail}</p>
                              <p className="actDate">{a.date}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="panelActions">
                    <button className="actionBtn" onClick={() => setPanelOpen(false)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      My Profile
                    </button>
                    <button className="actionBtn" onClick={() => { setPanelOpen(false); onNavigate("post-problem"); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Post Problem
                    </button>
                    <button className="actionBtn" onClick={() => { setPanelOpen(false); onNavigate("review-solutions"); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                      Reviews
                    </button>
                    <button className="actionBtn logoutBtn" onClick={() => { setPanelOpen(false); onNavigate("landing"); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="main">
          <div className="container">

            {/* Stats */}
            <div className="stats">
              {[
                { label: "Posted Problems",   value: MOCK_PROBLEMS.length, icon: "📋" },
                { label: "Total Submissions", value: totalSubmissions,      icon: "📥" },
                { label: "Paid Rewards",      value: "$1,200",             icon: "💰" },
              ].map((s) => (
                <div key={s.label} className="statCard">
                  <div className="statIcon">{s.icon}</div>
                  <h3 className="statTitle">{s.label}</h3>
                  <p className="statValue">{s.value}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="actions">
              <button className="ctaBtn" onClick={() => onNavigate("post-problem")}>Post New Problem</button>
              <button className="ctaBtn ctaBtnOutline" onClick={() => onNavigate("review-solutions")}>Review Solutions</button>
            </div>

            {/* Problems list */}
            <section className="section">
              <h2 className="sectionTitle">Your Problems</h2>
              <div className="problemGrid">
                {MOCK_PROBLEMS.map((p) => (
                  <div key={p.id} className="problemCard">
                    <h3 className="problemTitle">{p.title}</h3>
                    <div>
                      <div className="metaRow">
                        <span className="metaLabel">Status:</span>
                        <span className="statusBadge" style={{
                          background: STATUS_META[p.status].bg,
                          color: STATUS_META[p.status].color,
                        }}>
                          {p.status}
                        </span>
                      </div>
                      <div className="metaRow">
                        <span className="metaLabel">Submissions:</span>
                        <span className="metaValue">{p.submissions}</span>
                      </div>
                    </div>
                    <div className="cardActions">
                      <button className="smallBtn" onClick={() => onNavigate("review-solutions")}>View</button>
                      <button className="smallBtn" onClick={() => onNavigate("post-problem")}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}