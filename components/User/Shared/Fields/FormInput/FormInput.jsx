import React from "react";
import styles from "./FormInput.module.css";
import ErrorMessage from "../../StatusMessage/StatusMessage";
import { ubuntu } from "@/styles/fonts";

export default function FormInput(props) {
  return (
    <>
      <label className={styles.label}>{props.label}</label>{" "}
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeHolder}
        className={`${
          props.variant === "photos" ? styles.hidden : styles.input
        } ${ubuntu.className} ${styles["variant"]}`}
        {...props.register}
      />{" "}
      {props.error && <ErrorMessage>{props.error.message}</ErrorMessage>}
    </>
  );
}
