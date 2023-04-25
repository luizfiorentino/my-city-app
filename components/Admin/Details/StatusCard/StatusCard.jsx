import React, { useState, useEffect } from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";

import { dateFormat } from "@/utils/serialize";

export default function StatusCard({
  arrayChanges,
  issueStatus,
  issueDate,
  issueMessage,
  isHistory,
}) {
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <div className={styles.topCard}>
        <div className={styles.topCardInner}>
          <TextParagraph className={styles.status}>Status</TextParagraph>
          <TextBold variant="orangeButton">· {issueStatus}</TextBold>
        </div>
      </div>
      <div className={styles.bottomCard}>
        <TextParagraph className={styles.date}>
          {dateFormat(issueDate)}
        </TextParagraph>
        <BackgroundCanvas
          variant="lighterCanvas"
          className={styles.messageCanvas}
        >
          {issueMessage}
        </BackgroundCanvas>
      </div>
    </BackgroundCanvas>
  );
}
{
}
