import React from "react";
import styles from "./FormHeader.module.css";

export default function FormHeader({ children }) {
  return <h2 className={styles.main}>{children}</h2>;
}
