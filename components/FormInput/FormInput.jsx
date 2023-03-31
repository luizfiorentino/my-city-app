import React from "react";
import styles from "./FormInput.module.css";
import ErrorMessage from "../statusMessage/StatusMessage";

export default function FormInput(props) {
  return (
    <>
      <label className={styles.label}>{props.label}</label>{" "}
      <input
        defaultValue="test"
        type="text"
        placeholder={props.placeHolder}
        // value={props.value}
        // onChange={(e) => props.onChange(e)}
        className={styles.input}
        {...props.register}
      />{" "}
      {props.error && <ErrorMessage>{props.error.message}</ErrorMessage>}
    </>
  );
}
