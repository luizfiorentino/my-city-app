import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold/TextBold";
import { leagueSpartan } from "@/styles/fonts";

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
