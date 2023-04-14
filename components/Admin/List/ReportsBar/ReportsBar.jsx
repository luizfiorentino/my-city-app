import React from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../../../pages/assets/images/icon-arrow-down.svg";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { leagueSpartan } from "@/styles/fonts";
import Link from "next/link";

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
        <TextBold className={styles.filter}>
          Filter <span className={styles.filterExtraText}>by status</span>
          <img
            className={styles.arrowIcon}
            src={arrowIcon.src}
            alt="arrow down icon"
          />{" "}
        </TextBold>{" "}
        <Link href="/">
          <p className={`${styles.newIssue} ${leagueSpartan.className}`}>
            <span className={styles.addIcon}>
              <span className={styles.plusSign}>+</span>
            </span>{" "}
            <div className={styles.issueText}>
              New{" "}
              <span className={styles.extraText}>
                {" "}
                <span className={styles.ghost}>+</span>Issue
              </span>
            </div>
          </p>{" "}
        </Link>
      </div>
    </div>
  );
}
