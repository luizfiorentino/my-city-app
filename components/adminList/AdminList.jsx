import React from "react";
import styles from "./AdminList.module.css";
import AdminTopBar from "../adminTopBar/AdminTopBar";
import ReportsBar from "../reportsBar/ReportsBar";
import IssueCard from "../issueCard/IssueCard";
export default function AdminList(props) {
  //console.log("props.issues", props.issues);
  return (
    <div className={styles.main}>
      <AdminTopBar />
      <ReportsBar issues={props.issues} />
      <div className={styles.issuesList}>
        {props.data.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            userName={issue.userName}
            description={issue.description}
            location={issue.location}
          />
        ))}
      </div>
    </div>
  );
}
