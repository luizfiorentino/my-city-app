import React from "react";
import styles from "./IssueCard.module.css";

export default function IssueCard(props) {
  return (
    <div className={styles.cardMain}>
      <h3 className={styles.id}>
        <span className={styles.hash}>#</span>AMS{props.id.substring(0, 10)}
      </h3>{" "}
      <p className={styles.description}>{props.description}</p>{" "}
      <p className={styles.location}>{props.location}</p>
      <p className={styles.userName}>{props.userName}</p>
      <p className={styles.topicIcon}></p>
      <p className={styles.status}>Submited</p>
    </div>
  );
}
