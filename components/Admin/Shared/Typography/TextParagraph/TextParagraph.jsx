import React from "react";
import { leagueSpartan } from "@/styles/fonts";
import styles from "./TextParagraph.module.css";

export default function TextParagraph({
  variant = "primary",
  size = "regular",
  className,
  children,
  ...props
}) {
  return (
    <p
      {...props}
      className={`${className} ${styles[variant]} ${styles[size]} ${leagueSpartan.className}`}
    >
      {children}
    </p>
  );
}
