import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";

export default function StatusCard({ arrayChanges }) {
  const dayjs = require("dayjs");
  const changesOrderedByDate = arrayChanges.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const dateTest = arrayChanges.map((date) => {
    return dayjs(date.createdAt);
  });

  console.log("ordered by date", changesOrderedByDate);
  console.log("date test", dateTest);
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <TextParagraph className={styles.status}>Status</TextParagraph>
      <TextBold variant="orangeButton" className={styles.pending}>
        · {changesOrderedByDate[0]["status"]}
      </TextBold>
    </BackgroundCanvas>
  );
}
