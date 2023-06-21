import React, { useState, useContext } from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../../../pages/assets/images/icon-arrow-down.svg";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { leagueSpartan } from "@/styles/fonts";
import Link from "next/link";
import IssueContext from "@/utils/IssueContext";

export default function ReportsBar(props) {
  const context = useContext(IssueContext);
  console.log("CONTEXT", context.filterIssuesByStatus);
  const [status, setStatus] = useState("all");
  const [showSelector, setShowSelector] = useState(false);

  const issueStatusses = [
    "all",
    "Submitted",
    "On progress",
    "Information needed",
    "Solved",
  ];

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    context.setFilterIssueByStatus(selectedStatus);
  };

  const handleFilterClick = () => {
    setShowSelector(!showSelector);
  };

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
          Filter{" "}
          <span onClick={handleFilterClick} className={styles.filterExtraText}>
            by status
          </span>
          <img
            onClick={handleFilterClick}
            className={styles.arrowIcon}
            src={arrowIcon.src}
            alt="arrow down icon"
          />
          {showSelector && (
            <select onChange={handleStatusChange}>
              {issueStatusses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          )}
        </TextBold>

        <Link href="/">
          <button className={`${styles.newIssue} ${leagueSpartan.className}`}>
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
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}
