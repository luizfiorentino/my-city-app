import React from "react";
import styles from "./FormInput.module.css";
import ErrorMessage from "../../StatusMessage/StatusMessage";
import { ubuntu } from "@/styles/fonts";

export default function FormInput(props) {
  console.log(
    "INPUT NAME",
    props.name,
    "TYPE",
    props.type,
    "PROPS.REGISTER",
    props.register
  );
  return (
    <>
      <label className={styles.label}>{props.label}</label>{" "}
      <input
        // defaultValue="test"
        type={props.type}
        name={props.name}
        placeholder={props.placeHolder}
        // value={props.value}
        // onChange={(e) => props.onChange(e)}
        className={`${styles.input} ${ubuntu.className}`}
        {...props.register}
      />{" "}
      {props.error && <ErrorMessage>{props.error.message}</ErrorMessage>}
    </>
  );
}
