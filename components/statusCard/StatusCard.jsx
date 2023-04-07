import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../backgroundCanvas/BackgroundCanvas";
import TextParagraph from "../textParagraph/TextParagraph";
import TextBold from "../textBold/TextBold";

export default function StatusCard(props) {
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <TextParagraph variant={styles.status}>Status</TextParagraph>
      <TextBold variant={`${styles.status} ${styles.pending}`}>
        · Pending
      </TextBold>
    </BackgroundCanvas>
  );
}
