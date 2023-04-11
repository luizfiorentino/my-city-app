import React from "react";
import styles from "./TextParagraph.module.css";
import { leagueSpartan } from "@/styles/fonts";

export default function TextParagraph({
  variant = "primary",
  className,
  children,
  ...props
}) {
  //console.log("className ->", variant);
  return (
    <p
      {...props}
      className={`${styles.defaultText} ${className} ${styles[variant]} ${leagueSpartan.className}`}
    >
      {children}
    </p>
  );
}
