import React from "react";
import styles from "./StatusCard.module.css";

export default function StatusCard(props) {
  return (
    <div className={styles.statusCardContainer}>
      <p className={styles.statusTop}>Status</p>
      <p className={styles.status}>· Pending</p>
    </div>
  );
}
