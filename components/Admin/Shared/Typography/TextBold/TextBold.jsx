import React from "react";
import { leagueSpartan, ubuntu } from "@/styles/fonts";
import styles from "./TextBold.module.css";

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
      className={`${styles.textBoldRegular} ${className} ${styles[variant]} ${leagueSpartan.className} ${ubuntu.className}`}
    >
      {children}
    </TextTag>
  );
}
