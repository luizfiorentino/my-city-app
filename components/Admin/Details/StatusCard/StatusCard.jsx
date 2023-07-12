import React from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import { dateFormat } from "@/utils/serialize";
import StatusBanner from "../StatusBanner/StatusBanner";

export default function StatusCard({ issueStatus, issueDate, issueMessage }) {
  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <div className={styles.topCard}>
        <div className={styles.topCardInner}>
          <TextParagraph className={styles.status}>Status</TextParagraph>
          <StatusBanner
            variant={issueStatus === "Solved" ? "solved" : "primary"}
          >
            · {issueStatus}
          </StatusBanner>
        </div>
      </div>
      <div className={styles.bottomCard}>
        <TextParagraph>{dateFormat(issueDate)}</TextParagraph>
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
