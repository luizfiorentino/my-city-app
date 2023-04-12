import React from "react";
import styles from "./HashItem.module.css";
import TextBold from "../../Shared/Typography/TextBold";

export default function HashItem({ variant = "normal", className, children }) {
  return (
    <div className={`${styles.hashItemContainer} ${className} ${variant}`}>
      <span className={styles.hash}>#</span>
      <TextBold className={styles.lighterText}>{children}</TextBold>
    </div>
  );
}
