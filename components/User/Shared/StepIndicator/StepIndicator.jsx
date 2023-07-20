import React, { useContext } from "react";
import styles from "./StepIndicator.module.css";
import { ubuntu } from "@/styles/fonts";
import IssueContext from "@/utils/IssueContext";

export default function StepIndicator({
  number,
  description,
  selected,
  ...props
}) {
  const { selectedStepForm } = useContext(IssueContext);

  return (
    <div {...props} className={`${styles.mainContainer} ${ubuntu.className}`}>
      <div className={selected ? styles.circleActive : styles.circle}>
        {number}
      </div>
      <div className={styles.innerContainer}>
        <p className={styles.stepNumber}>{`STEP ${number}`}</p>
        <p className={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
}
