import React from "react";
import styles from "./FormInput.module.css";
import ErrorMessage from "../errorMessage/ErrorMessage";

export default function FormInput(props) {
  let messageName;
  let messageDescription;
  let messageLocation;

  if (props.errors.userName) {
    messageName = props.errors.userName.message;
  }
  if (props.errors.description) {
    messageDescription = props.errors.description.message;
  }
  if (props.errors.location) {
    messageLocation = props.errors.location.message;
  }

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
      />
      {props.errors.userName && props.label === "Name" ? (
        <ErrorMessage>{messageName}</ErrorMessage>
      ) : undefined}
      {props.errors.description && props.label === "Description" ? (
        <ErrorMessage>{messageDescription}</ErrorMessage>
      ) : undefined}
      {props.errors.location && props.label === "Location" ? (
        <ErrorMessage>{messageLocation}</ErrorMessage>
      ) : undefined}
    </>
  );
}
