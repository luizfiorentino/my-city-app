import React from "react";
import styles from "./ConfirmationMessage.module.css";
import Footer from "../../Shared/Footer";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";

export default function ConfirmationMessage(props) {
  console.log("props", props.variant);
  return (
    <div
      {...props}
      className={
        props.variant ? `${styles[props.variant]}` : `${styles.mainContainer}`
      }
    >
      <div className={styles.externalContainer}>
        <h2 className={styles.message}>{props.title}</h2>
        <h4 className={styles.subtitle}>{props.subtitle}</h4>
        <div className={styles.summary}>{props.children}</div>
      </div>

      <Footer className={styles.footer}>
        {props.footer}
        {props.loading && <LoaderSpinner className={styles.spinner} />}
      </Footer>
    </div>
  );
}
