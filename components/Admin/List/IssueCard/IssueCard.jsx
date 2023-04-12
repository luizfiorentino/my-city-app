import React, { useState } from "react";
import styles from "./IssueCard.module.css";
import arrowDown from "../../../../pages/assets/images/icon-arrow-down.svg";
import Link from "next/link";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import { dateFormat } from "@/utils/serialize";
import TextBold from "../../Shared/Typography/TextBold";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";

export default function IssueCard(props) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <BackgroundCanvas>
      <div
        className={styles.cardMain}
        onClick={() => setShowDescription(!showDescription)}
      >
        <TextBold className={styles.id}>
          <TextBold variant="hash" className={styles.hash}>
            #
          </TextBold>{" "}
          {`AMS${props.id.substring(0, 10)}`}
        </TextBold>
        <TextParagraph className={styles.posted}>
          {dateFormat(props.date)}
        </TextParagraph>
        <TextBold variant="higherLine" className={styles.location}>
          {props.location}
        </TextBold>
        <TextParagraph className={styles.userName}>
          {props.userName}
        </TextParagraph>
        <TextBold variant="orangeButton" className={styles.submitted}>
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
        <BackgroundCanvas
          className={styles.description}
          variant="lighterCanvas"
        >
          {props.description}
        </BackgroundCanvas>
      )}
    </BackgroundCanvas>
  );
}
