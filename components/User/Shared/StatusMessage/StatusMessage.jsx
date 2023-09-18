import React from "react";
import styles from "./StatusMessage.module.css";

export default function StatusMessage({ children, type, variant }) {
  return (
    <p
      className={
        type === "success"
          ? styles.sucess
          : `${styles.message} ${styles[variant]}`
      }
    >
      {children}
    </p>
  );
}
