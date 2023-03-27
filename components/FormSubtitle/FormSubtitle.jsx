import React from "react";
import styles from "./FormSubtitle.module.css";

export default function FormSubtitle() {
  return (
    <p className={styles.main}>
      Please provide your name, description and location of the issue.
    </p>
  );
}
