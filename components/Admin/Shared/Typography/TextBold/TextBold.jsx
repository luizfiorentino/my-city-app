import React from "react";
import styles from "./TextBold.module.css";
import { leagueSpartan } from "@/styles/fonts";

export default function TextBold({
  variant = "normal",
  className,
  children,
  ...props
}) {
  //console.log("text bold", variant);
  const TextTag = variant === "hash" ? "span" : "p";

  return (
    <TextTag
      {...props}
      className={`${styles.textBoldRegular} ${className} ${styles[variant]} ${leagueSpartan.className}`}
    >
      {children}
    </TextTag>
  );
}
