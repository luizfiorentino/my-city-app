import React from "react";
import styles from "./AdminList.module.css";
import AdminTopBar from "../../Nav/AdminTopBar";
import ReportsBar from "../ReportsBar";
import IssueCard from "../IssueCard";
export default function AdminList(props) {
  console.log("ADMIN LIST props.issues", props);
  return (
    <div className={styles.main}>
      {/* {props.issues ? undefined : <p>Problem with db</p>} */}

      <AdminTopBar />
      <div className={styles.barAndCardList}>
        <ReportsBar issues={props.issues} />
        <div className={styles.issuesList}>
          {props.data.map((issue) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              date={issue.createdAt}
              userName={issue.userName}
              description={issue.description}
              location={issue.location}
              updates={props.updates}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
