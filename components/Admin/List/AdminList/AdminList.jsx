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
  const [issuesSelected, setIssuesSelected] = useState(0);

  let noIssue;

  const filterIssues = () => {
    const selectedIssues = props.data
      .filter(
        (issue) =>
          context.filterIssuesByStatus === "All" ||
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

  //Keep it otherwise filter is not functional
  const me = filterIssues();

  useEffect(() => {
    const selectedIssues = filterIssues();
    setIssuesSelected(
      selectedIssues.length === undefined ? 0 : selectedIssues.length
    );
  }, [filterIssues]);

  return (
    <div className={styles.main}>
      <AdminTopBar />
      <div className={styles.barAndCardList}>
        <ReportsBar issues={props.data} selectedItems={issuesSelected} />
        <div className={styles.issuesList}>
          {!noIssue &&
            filterIssues(props.data)
              .sort(
                (issueA, issueB) =>
                  new Date(issueB.createdAt) - new Date(issueA.createdAt)
              )
              .map((issue) => (
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
