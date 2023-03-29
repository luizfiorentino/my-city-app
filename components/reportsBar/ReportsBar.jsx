import React from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../pages/assets/images/icon-arrow-down.svg";

export default function ReportsBar(props) {
  return (
    <div className={styles.main}>
      <div className={styles.issuesAndTotal}>
        <h3 className={styles.issues}>Issues</h3>
        <h5 className={styles.total}>Total: {props.issues.length}</h5>
      </div>
      <div className={styles.filterAndEdit}>
        <label className={styles.filter}>
          Filter{" "}
          <img
            className={styles.arrowIcon}
            src={arrowIcon.src}
            alt="arrow down icon"
          />
        </label>
        <p className={styles.newIssue}>
          <span className={styles.addIcon}>+</span> New
        </p>
      </div>
    </div>
  );
}
