import React from "react";
import styles from "./AdminTbIcon.module.css";

export default function AdminTbIcon() {
  return (
    <p className={styles.main}>
      <div className={styles.pacmanUp}>
        <div className={styles.pacmanInner}>
          {/* <span className={styles.triangle}></span> */}
        </div>
      </div>
      <div className={styles.pacman}></div>

      <div className={styles.screen}></div>
    </p>
  );
}
