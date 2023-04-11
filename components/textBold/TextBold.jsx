import React from "react";
import styles from "./TextBold.module.css";

export default function TextBold({
  variant = "normal",
  className,
  children,
  ...props
}) {
  //console.log("text bold", variant);
  return (
    <p
      {...props}
      className={`${styles.textBoldRegular} ${className} ${styles[variant]}`}
    >
      {children}
    </p>
  );
}
