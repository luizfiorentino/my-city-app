import React from "react";
import styles from "./ReportsBar.module.css";

export default function ReportsBar(props) {
  return (
    <div className={styles.main}>
      <h3>Issues</h3>
      <h5>Total: {props.issues.length}</h5>
    </div>
  );
}
