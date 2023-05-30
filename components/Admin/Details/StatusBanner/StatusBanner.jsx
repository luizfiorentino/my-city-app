import React from "react";
import styles from "./StatusBanner.module.css";

export default function StatusBanner({
  children,
  className,
  variant = "primary",
  ...props
}) {
  //console.log("variant", variant);
  return (
    <p {...props} className={`${styles.bannerMain} ${styles[variant]}`}>
      {children}
    </p>
  );
}
