import React from "react";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";
import image from "../../pages/assets/images/bg-sidebar-mobile.svg";

export default function UserForm() {
  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <img src={image.src} />
      </div>
      <div className={styles.form}>
        <FormContent />
        <div className={styles.issuesList}></div>
      </div>
    </div>
  );
}
