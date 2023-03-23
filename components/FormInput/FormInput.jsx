import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  return (
    <div className={styles.main}>
      <label>{props.label}</label>
      <input className={styles.placeholder} placeholder={props.placeHolder} />
    </div>
  );
}
