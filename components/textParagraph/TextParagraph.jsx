import React from "react";
import styles from "./TextParagraph.module.css";

export default function TextParagraph({
  variant = "normal",
  className,
  children,
  ...props
}) {
  //console.log("className ->", variant);
  return (
    <p
      {...props}
      className={`${styles.defaultText} ${className} ${styles[variant]}`}
    >
      {children}
    </p>
  );
}
