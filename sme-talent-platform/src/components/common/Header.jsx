import React from "react";
import styles from "./Header.module.css";

const Header = ({ title, user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>{title}</h1>
        {user && (
          <div className={styles.userMenu}>
            <span className={styles.userName}>Welcome, {user.name}</span>
            <button className={styles.logoutButton} onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
