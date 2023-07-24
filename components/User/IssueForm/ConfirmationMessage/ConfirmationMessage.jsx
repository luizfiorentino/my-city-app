import React from "react";
import styles from "./ConfirmationMessage.module.css";
import Footer from "../../Shared/Footer";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";

export default function ConfirmationMessage({
  footer,
  loading,
  title,
  subtitle,
  children,
  variant = "regular",
  ...props
}) {
  console.log("variant?", variant);
  return (
    <div
      {...props}
      className={`${styles.bannerMain} ${styles[variant]}`}
      // className={
      //   props.variant ? `${styles[props.variant]}` : styles.mainContainer
      // }
    >
      <div className={styles.externalContainer}>
        <h2
          className={
            variant === "largeFont" ? styles.largeFont : styles.message
          }
        >
          {title}
        </h2>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <div className={styles.summary}>{children}</div>
      </div>
    </div>
  );
}
