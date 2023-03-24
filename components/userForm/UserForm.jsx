import React from "react";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";

export default function UserForm(props) {
  return (
    <div className={styles.main}>
      <FormContent />
      <div className={styles.issuesList}>
        <h3>Issues</h3>
        {props.issues.map((issue) => (
          <li key={issue}>{issue}</li>
        ))}
      </div>
    </div>
  );
}
