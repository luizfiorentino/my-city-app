import React from "react";
import styles from "./StatusMessage.module.css";

export default function StatusMessage({ children, type }) {
  return (
    <p className={type === "success" ? styles.sucess : styles.message}>
      {children}
    </p>
  );
}
