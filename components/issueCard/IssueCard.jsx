import React, { use, useState } from "react";
import styles from "./IssueCard.module.css";
import arrowDown from "../../pages/assets/images/icon-arrow-down.svg";
import Description from "../description/Description";
import Link from "next/link";
import TextParagraph from "../textParagraph/TextParagraph";
import HashItem from "../hashItem/HashItem";
import { dateFormat } from "@/utils/serialize";
import TextBold from "../textBold/TextBold";

export default function IssueCard(props) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div>
      <div
        className={styles.cardMain}
        onClick={() => setShowDescription(!showDescription)}
      >
        {/* <TextFragment className={`${styles.regularText} ${styles.id}`}>
          <span className={`${styles.regularText} ${styles.hash}`}>#</span>AMS
          {props.id.substring(0, 10)}
        </TextFragment>{" "} */}
        <HashItem
          variant={`${styles.id} ${styles.hash}`}
        >{`AMS${props.id.substring(0, 10)}`}</HashItem>
        <TextParagraph variant={`${styles.smallerText} ${styles.posted}`}>
          {dateFormat(props.date)}
        </TextParagraph>
        <TextBold variant={styles.location}>{props.location}</TextBold>
        <TextParagraph variant={`${styles.smallerText} ${styles.userName}`}>
          {props.userName}
        </TextParagraph>
        <TextBold variant={`${styles.regularText} ${styles.submitted}`}>
          {/* <span className={styles.topicIcon}></span> */}
          <Link href={`admin/issues/${props.id}`}>· Submited</Link>
        </TextBold>
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
