import React from "react";
import styles from "./FormSubtitle.module.css";

export default function FormSubtitle({ children, variant = "primary" }) {
  return <p className={`${styles.main} ${styles[variant]}`}>{children}</p>;
}
