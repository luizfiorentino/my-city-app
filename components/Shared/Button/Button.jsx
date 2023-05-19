import React from "react";
import styles from "./Button.module.css";
import { leagueSpartan } from "@/styles/fonts";

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}) {
  return (
    <button
      {...props}
      className={`${styles.btn} ${leagueSpartan.className} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
