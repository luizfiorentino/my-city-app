import React, { Fragment } from "react";
// import LoaderImage from "../../../pages/assets/images/Iphone-spinner-2.gif";
import LoaderImage from "/Users/luizfiorentino/Code/my-city-app/pages/assets/images/Iphone-spinner-2.gif";
import styles from "./LoaderSpinner.module.css";

export default function LoaderSpinner() {
  return (
    <Fragment>
      <img
        src={LoaderImage.src}
        alt="loader image"
        className={styles.defaultSpinner}
      />
    </Fragment>
  );
}
