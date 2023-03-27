import React from "react";
import styles from "./IssueCard.module.css";

export default function IssueCard(props) {
  return (
    <div className={styles.main}>
      <div className={styles.idAndName}>
        <p className={styles.id}>
          <span className={styles.hash}>#</span>AMS{props.id.substring(0, 10)}
        </p>
        <p className={styles.nameAndDescription}>{props.userName}</p>
      </div>
      <div className={styles.contentAndStatus}>
        <div className={styles.contentAndStatusTop}>
          <p className={styles.nameAndDescription}>{props.description}</p>
          <p className={styles.location}>{props.location}</p>
        </div>
        <div className={styles.status}>
          <p className={styles.topicIcon}></p>
          <p>Submited</p>
        </div>
      </div>
    </div>
  );
}
