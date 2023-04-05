import React, { use, useState } from "react";
import styles from "./IssueCard.module.css";
import arrowDown from "../../pages/assets/images/icon-arrow-down.svg";
import Description from "../description/Description";
import Link from "next/link";

export default function IssueCard(props) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div>
      <div
        className={styles.cardMain}
        onClick={() => setShowDescription(!showDescription)}
      >
        <button>
          <Link href={`admin/issues/${props.id}`}>Details</Link>
        </button>
        <h3 className={styles.id}>
          <span className={styles.hash}>#</span>AMS{props.id.substring(0, 10)}
        </h3>{" "}
        <p className={styles.posted}>{props.date.substring(0, 9)}</p>{" "}
        <p className={styles.location}>{props.location}</p>
        <p className={styles.userName}>{props.userName}</p>
        <p className={styles.status}>
          <span className={styles.topicIcon}>·</span>Submited
        </p>
        {showDescription === false ? (
          <img
            src={arrowDown.src}
            className={styles.arrowDown}
            alt="arrow down"
          />
        ) : (
          <img
            src={arrowDown.src}
            className={`${styles.arrowDown} ${styles.arrowUp}`}
            alt="arrow up"
          />
        )}
      </div>{" "}
      {showDescription === false ? undefined : (
        <div className={styles.description}>
          <Description className={styles.innerDescription}>
            {props.description}
          </Description>
        </div>
      )}
    </div>
  );
}
