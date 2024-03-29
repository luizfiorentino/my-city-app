import React, { useState } from "react";
import Link from "next/link";
import styles from "./IssueCard.module.css";
import arrowDown from "../../../../pages/assets/images/icon-arrow-down.svg";
import { dateFormat } from "@/utils/serialize";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextBold from "../../Shared/Typography/TextBold";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import StatusBanner from "../../Details/StatusBanner/StatusBanner";

export default function IssueCard(props) {
  const [showDescription, setShowDescription] = useState(false);

  const wholeAddress = props.location;
  const location = wholeAddress
    .split(" ")
    .slice(0, 2)
    .join(" ")
    .replace(/,/g, "");

  return (
    <BackgroundCanvas>
      <div
        className={styles.cardMain}
        onClick={() => setShowDescription(!showDescription)}
      >
        <TextBold className={styles.id}>
          <TextBold variant="hash" className={styles.hash}>
            #
          </TextBold>
          {`AMS${props.id?.substring(0, 10)}`}
        </TextBold>
        <TextParagraph className={styles.posted}>
          {dateFormat(props.date)}
        </TextParagraph>
        <TextBold variant="location" className={styles.location}>
          {location}
        </TextBold>
        <TextParagraph className={styles.userName}>
          {props.userName}
        </TextParagraph>
        <div className={`${styles.submitted} ${styles.status}`}>
          <StatusBanner
            variant={
              props.updates[0]["status"] === "Solved" ? "solved" : "primary"
            }
          >
            <Link href={`admin/issues/${props.id}`}>
              · {props.updates[0]["status"]}
            </Link>
          </StatusBanner>
        </div>
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
