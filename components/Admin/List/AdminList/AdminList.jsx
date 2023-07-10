import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminList.module.css";
import AdminTopBar from "../../Nav/AdminTopBar";
import ReportsBar from "../ReportsBar";
import IssueCard from "../IssueCard";
import IssueContext from "@/utils/IssueContext";
import emptyImage from "../../../../pages/assets/images/illustration-empty.svg";
import TextBold from "../../Shared/Typography/TextBold/TextBold";

export default function AdminList(props) {
  const context = useContext(IssueContext);
  console.log("status", context.filterIssuesByStatus);

  let noIssue;

  const filterIssues = () => {
    const selectedIssues = props.data

      .filter(
        (issue) =>
          context.filterIssuesByStatus === "all" ||
          issue.statusChange[0].status === context.filterIssuesByStatus
      )
      .slice()
      .reverse();

    if (!selectedIssues.length) {
      noIssue = true;
      return noIssue;
    }
    return selectedIssues;
  };

  useEffect(() => {
    filterIssues();
  }, []);

  const me = filterIssues();

  return (
    <div className={styles.main}>
      <AdminTopBar />
      <div className={styles.barAndCardList}>
        <ReportsBar issues={props.data} />

        <div className={styles.issuesList}>
          {!noIssue &&
            filterIssues(props.data).map((issue) => (
              <IssueCard
                key={issue.id}
                id={issue.id}
                date={issue.createdAt}
                userName={issue.userName}
                description={issue.description}
                location={issue.location}
                updates={issue.statusChange}
              />
            ))}
          {noIssue === true && (
            <div className={styles.emptyResult}>
              <img className={styles.emptyImg} src={emptyImage.src} />

              <TextBold variant="largerFont">There is nothing here</TextBold>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
