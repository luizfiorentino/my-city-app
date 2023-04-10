import React from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../pages/assets/images/icon-arrow-down.svg";
import TextFragment from "../textFragment/TextFragment";
import TextParagraph from "../textParagraph/TextParagraph";
import TextBold from "../textBold/TextBold";

export default function ReportsBar(props) {
  return (
    <div className={styles.main}>
      <div className={styles.issuesAndTotal}>
        <TextBold variant={styles.issues}>Issues</TextBold>
        <TextParagraph className={styles.total}>
          Total: {props.issues.length}
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
        <TextFragment className={`${styles.letterMedium} ${styles.newIssue}`}>
          <span className={styles.addIcon}>+</span> New
        </TextFragment>
      </div>
    </div>
  );
}
