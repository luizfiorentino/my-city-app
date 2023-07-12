import React, { useState, useContext } from "react";
import Link from "next/link";
import { leagueSpartan } from "@/styles/fonts";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../../../pages/assets/images/icon-arrow-down.svg";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import IssueContext from "@/utils/IssueContext";
import StatusBanner from "../../Details/StatusBanner/StatusBanner";

export default function ReportsBar(props) {
  const context = useContext(IssueContext);
  const [status, setStatus] = useState("All");
  const [showSelector, setShowSelector] = useState(false);

  const issueStatusses = [
    "All",
    "Submitted",
    "On progress",
    "Information needed",
    "Solved",
  ];

  const handleFilterClick = () => {
    setShowSelector(!showSelector);
  };

  const handleStatusChoice = (status) => {
    setStatus(status);
    context.setFilterIssueByStatus(status);
    setShowSelector(!showSelector);
  };

  return (
    <div className={styles.main}>
      <div>
        <TextBold variant="largeText" className={styles.issues}>
          Issues
        </TextBold>
        {context.filterIssuesByStatus === "All" ? (
          <TextParagraph className={styles.total}>
            Total: <span style={{ color: "white" }}>{props.issues.length}</span>
          </TextParagraph>
        ) : (
          <TextParagraph className={styles.total}>
            {`${context.filterIssuesByStatus}: `}
            <span style={{ color: "white" }}>{props.selectedItems}</span>
          </TextParagraph>
        )}
      </div>
      <div className={styles.filterAndEdit}>
        {!showSelector && (
          <TextBold className={styles.filter}>
            Filter
            <span
              onClick={handleFilterClick}
              className={styles.filterExtraText}
            >
              by status
            </span>
            <img
              onClick={handleFilterClick}
              className={styles.arrowIcon}
              src={arrowIcon.src}
              alt="arrow down icon"
            />
          </TextBold>
        )}

        <div
          className={!showSelector ? styles.hidden : styles.dropdownContainer}
        >
          <ul className={styles.dropdown}>
            <IoMdCloseCircleOutline
              className={styles.closeIcon}
              onClick={() => setShowSelector(false)}
            />
            {issueStatusses.map((status) => (
              <li
                key={status}
                className={styles.lItems}
                onClick={() => handleStatusChoice(status)}
              >
                <StatusBanner
                  variant={status === "Solved" ? "solved" : "primary"}
                >
                  · {status}
                </StatusBanner>
              </li>
            ))}
          </ul>
        </div>

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
