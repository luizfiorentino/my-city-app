import React from "react";
import styles from "./ConfirmationMessage.module.css";
import Footer from "../../Shared/Footer";

export default function ConfirmationMessage(props) {
  return (
    <div {...props}>
      <div className={styles.externalContainer}>
        <h2 className={styles.message}>{props.title}</h2>
        <h4 className={styles.subtitle}>{props.subtitle}</h4>
      </div>

      <Footer className={styles.footer}>Back</Footer>
    </div>
  );
}
