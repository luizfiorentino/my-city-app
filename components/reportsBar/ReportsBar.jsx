import React from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../pages/assets/images/icon-arrow-down.svg";
import TextFragment from "../textFragment/TextFragment";

export default function ReportsBar(props) {
  return (
    <div className={styles.main}>
      <div className={styles.issuesAndTotal}>
        <TextFragment className={styles.issues}>Issues</TextFragment>
        <TextFragment className={styles.total}>
          Total: {props.issues.length}
        </TextFragment>
      </div>
      <div className={styles.filterAndEdit}>
        <label className={styles.letterMedium}>
          Filter{" "}
          <img
            className={styles.arrowIcon}
            src={arrowIcon.src}
            alt="arrow down icon"
          />
        </label>
        <TextFragment className={`${styles.letterMedium} ${styles.newIssue}`}>
          <span className={styles.addIcon}>+</span> New
        </TextFragment>
      </div>
    </div>
  );
}
