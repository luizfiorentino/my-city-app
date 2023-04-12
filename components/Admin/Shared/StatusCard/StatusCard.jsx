import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../Typography/TextParagraph";
import TextBold from "../Typography/TextBold/TextBold";
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
