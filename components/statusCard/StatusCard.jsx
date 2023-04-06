import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../backgroundCanvas/BackgroundCanvas";

export default function StatusCard(props) {
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <p className={styles.statusTop}>Status</p>
      <p className={styles.status}>· Pending</p>
    </BackgroundCanvas>
  );
}
