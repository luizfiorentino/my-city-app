import React from "react";
import styles from "./BackgroundCanvas.module.css";

export default function BackgroundCanvas({ className, ...props }) {
  return (
    <div {...props} className={`${styles.mainCanvas} ${className}`}>
      {props.children}
    </div>
  );
}
