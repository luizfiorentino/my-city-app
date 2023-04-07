import React from "react";
import styles from "./HashItem.module.css";
import TextBold from "../textBold/TextBold";

export default function HashItem({ variant = "normal", children }) {
  return (
    <div className={`${styles.hashItemContainer} ${variant}`}>
      <span className={styles.hash}>#</span>
      <TextBold className={`${styles.lighterText}`}>{children}</TextBold>
    </div>
  );
}
