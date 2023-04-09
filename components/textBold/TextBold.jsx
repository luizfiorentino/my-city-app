import React from "react";
import styles from "./TextBold.module.css";

export default function TextBold({ variant = "normal", children, ...props }) {
  console.log("text bold", variant);
  return <p className={`${styles.textBoldRegular} ${variant}`}>{children}</p>;
}
