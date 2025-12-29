import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>SME Talent Platform</h3>
            <p className={styles.footerText}>
              Connecting small businesses with emerging talent to solve
              real-world problems.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Resources</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} SME Talent Platform. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
