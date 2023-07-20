import React from "react";
import styles from "./StepIndicator.module.css";
import { ubuntu } from "@/styles/fonts";

export default function StepIndicator({ number, description, ...props }) {
  return (
    <div {...props} className={`${styles.mainContainer} ${ubuntu.className}`}>
      <div className={styles.circle}>{number}</div>
      <div className={styles.innerContainer}>
        <p className={styles.stepNumber}>{`STEP ${number}`}</p>
        <p className={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
}
