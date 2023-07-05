import React, { useContext } from "react";
import styles from "./AdminList.module.css";
import AdminTopBar from "../../Nav/AdminTopBar";
import ReportsBar from "../ReportsBar";
import IssueCard from "../IssueCard";
import IssueContext from "@/utils/IssueContext";

export default function AdminList(props) {
  const context = useContext(IssueContext);

  return (
    <div className={styles.main}>
      <AdminTopBar />
      <div className={styles.barAndCardList}>
        <ReportsBar issues={props.data} />
        <div className={styles.issuesList}>
          {props.data
            .filter(
              (issue) =>
                context.filterIssuesByStatus === "all" || // Add this condition
                issue.statusChange[0].status === context.filterIssuesByStatus
            )
            .slice()
            .reverse()
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
        </div>
      </div>
    </div>
  );
}
