import React from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../pages/assets/images/icon-arrow-down.svg";
import TextParagraph from "../textParagraph/TextParagraph";
import TextBold from "../textBold/TextBold";

export default function ReportsBar(props) {
  return (
    <div className={styles.main}>
      <div>
        <TextBold variant="largeText" className={styles.issues}>
          Issues
        </TextBold>
        <TextParagraph className={styles.total}>
          Total: <span style={{ color: "white" }}>{props.issues.length}</span>
        </TextParagraph>
      </div>
      <div className={styles.filterAndEdit}>
        <TextBold>
          Filter{" "}
          <img
            className={styles.arrowIcon}
            src={arrowIcon.src}
            alt="arrow down icon"
          />
        </TextBold>
        <p className={styles.newIssue}>
          <span className={styles.addIcon}>+</span> New
        </p>
      </div>
    </div>
  );
}
