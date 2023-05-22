import React from "react";
import styles from "./FormSubtitle.module.css";

export default function FormSubtitle({ children }) {
  return <p className={styles.main}>{children}</p>;
}
