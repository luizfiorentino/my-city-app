import React from "react";
import styles from "./statusMessage.module.css";

export default function ErrorMessage({ children, type }) {
  return (
    <p className={type === "success" ? styles.sucess : styles.message}>
      {children}
    </p>
  );
}
