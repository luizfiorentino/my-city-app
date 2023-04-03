import React from "react";
import styles from "./Description.module.css";

export default function Description({ children }) {
  return <div className={styles.descriptionMain}>{children}</div>;
}
