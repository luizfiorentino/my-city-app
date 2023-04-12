import React from "react";
import styles from "./BackgroundCanvas.module.css";
import { leagueSpartan } from "@/styles/fonts";

export default function BackgroundCanvas({
  className,
  variant = "primary",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${styles.mainCanvas} ${className} ${styles[variant]} ${leagueSpartan.className}`}
    >
      {props.children}
    </div>
  );
}
