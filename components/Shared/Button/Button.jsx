import React from "react";
import styles from "./Button.module.css";
import { leagueSpartan } from "@/styles/fonts";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { ubuntu } from "@/styles/fonts";

export default function Button({
  children,
  className,
  variant = "primary",
  loading,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${styles.btn} ${leagueSpartan.className} ${ubuntu.className} ${styles[variant]} ${className}
       
      `}
    >
      {children}
      {loading && <LoaderSpinner className={styles.spinner} />}
    </button>
  );
}
