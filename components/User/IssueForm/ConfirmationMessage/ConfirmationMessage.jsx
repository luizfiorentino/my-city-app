import React from "react";
import styles from "./ConfirmationMessage.module.css";
import Footer from "../Footer/Footer";
import Button from "../../../Admin/Shared/Button/Button.jsx";
import Link from "next/link";

export default function ConfirmationMessage(props) {
  return (
    <div>
      <div className={styles.externalContainer}>
        <h2 className={styles.message}>Thanks for submiting your issue!</h2>
        <h4 className={styles.subtitle}>
          your report will make our city more awesome!
        </h4>
      </div>

      <Footer className={styles.footer} onClick={props.onClick}>
        Back
      </Footer>
    </div>
  );
}
