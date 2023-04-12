import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";

export default function StatusCard() {
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <TextParagraph className={styles.status}>Status</TextParagraph>
      <TextBold variant="orangeButton" className={styles.pending}>
        · Pending
      </TextBold>
    </BackgroundCanvas>
  );
}
