import React from "react";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";

export default function UserForm() {
  return (
    <div className={styles.main}>
      <FormContent />
      <div className={styles.issuesList}></div>
    </div>
  );
}
