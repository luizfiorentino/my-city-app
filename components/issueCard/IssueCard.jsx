import React, { use, useState } from "react";
import styles from "./IssueCard.module.css";
import arrowDown from "../../pages/assets/images/icon-arrow-down.svg";
import Description from "../description/Description";
import Link from "next/link";
import TextFragment from "../textFragment/TextFragment";

export default function IssueCard(props) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div>
      <div
        className={styles.cardMain}
        onClick={() => setShowDescription(!showDescription)}
      >
        <TextFragment className={`${styles.regularText} ${styles.id}`}>
          <span className={`${styles.regularText} ${styles.hash}`}>#</span>AMS
          {props.id.substring(0, 10)}
        </TextFragment>{" "}
        <TextFragment className={`${styles.smallerText} ${styles.posted}`}>
          {props.date.substring(0, 9)}
        </TextFragment>
        <TextFragment className={styles.location}>
          {props.location}
        </TextFragment>
        <TextFragment className={`${styles.smallerText} ${styles.userName}`}>
          {props.userName}
        </TextFragment>
        <TextFragment className={`${styles.regularText} ${styles.status}`}>
          <span className={styles.topicIcon}>·</span>
          <Link href={`admin/issues/${props.id}`}>Submited</Link>
        </TextFragment>
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
