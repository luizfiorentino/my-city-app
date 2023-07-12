import React from "react";
import styles from "./TextParagraph.module.css";
import { leagueSpartan } from "@/styles/fonts";

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
