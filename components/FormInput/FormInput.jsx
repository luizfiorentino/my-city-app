import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  // const { userName, description, location, name, issue, place } =
  //   issuesContext();
  //console.log("props", props);
  return (
    <div className={styles.main}>
      <label>{props.label}</label>
      <input
        className={styles.placeholder}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
}
