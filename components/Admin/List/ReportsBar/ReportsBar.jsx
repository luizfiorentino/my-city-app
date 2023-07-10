import React, { useState, useContext } from "react";
import styles from "./ReportsBar.module.css";
import arrowIcon from "../../../../pages/assets/images/icon-arrow-down.svg";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { leagueSpartan } from "@/styles/fonts";
import Link from "next/link";
import IssueContext from "@/utils/IssueContext";
import StatusBanner from "../../Details/StatusBanner/StatusBanner";
import { IoMdCloseCircleOutline } from "react-icons/io";

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

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    //e.target.value = "Submited" etc.
    setStatus(selectedStatus);
    context.setFilterIssueByStatus(selectedStatus);
    setShowSelector(!showSelector);
  };

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
        <TextParagraph className={styles.total}>
          Total: <span style={{ color: "white" }}>{props.issues.length}</span>
        </TextParagraph>
      </div>
      <div className={styles.filterAndEdit}>
        {!showSelector && (
          <TextBold className={styles.filter}>
            Filter{" "}
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
        {/* {showSelector && (
          <select onChange={handleStatusChange}>
            {issueStatusses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        )} */}
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
