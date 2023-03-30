import React from "react";
import styles from "./IssueCard.module.css";

export default function IssueCard(props) {
  return (
    <div className={styles.cardMain}>
      <h3 className={styles.id}>
        <span className={styles.hash}>#</span>AMS{props.id.substring(0, 10)}
      </h3>{" "}
      <p className={styles.posted}>{props.date.substring(0, 9)}</p>{" "}
      <p className={styles.location}>{props.location}</p>
      <p className={styles.userName}>{props.userName}</p>
      <p className={styles.status}>
        <span className={styles.topicIcon}>·</span>Submited
      </p>
    </div>
  );
}
