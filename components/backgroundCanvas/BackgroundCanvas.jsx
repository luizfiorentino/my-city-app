import React from "react";
import styles from "./BackgroundCanvas.module.css";

export default function BackgroundCanvas({
  className,
  variant = "primary",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${styles.mainCanvas} ${className} ${styles[variant]}`}
    >
      {props.children}
    </div>
  );
}
