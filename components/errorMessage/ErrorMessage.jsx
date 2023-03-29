import React from "react";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ children }) {
  return <p className={styles.message}>{children}</p>;
}
