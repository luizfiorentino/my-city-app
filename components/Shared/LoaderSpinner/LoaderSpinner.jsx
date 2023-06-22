import React, { Fragment } from "react";
// import LoaderImage from "../../../pages/assets/images/Iphone-spinner-2.gif";
import LoaderImage from "../../../pages/assets/images/spinner.gif";
import styles from "./LoaderSpinner.module.css";

export default function LoaderSpinner({
  size = "small",
  className,
  variant = "primary",
  ...props
}) {
  return (
    <img
      {...props}
      src={LoaderImage.src}
      alt="loader image"
      className={`${styles.defaultSpinner} ${styles[size]} ${styles[variant]}`}
    />
  );
}
