import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  // const { userName, description, location, name, issue, place } =
  //   issuesContext();
  //console.log("props", props);
  return (
    <>
      <label className={styles.label}>{props.label}</label>{" "}
      <input
        type="text"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        className={styles.input}
        {...props.register}
      />
      {props.errors.userName && <p>{props.errors.userName.message}</p>}
    </>
  );
}
