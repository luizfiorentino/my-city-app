import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  // const { userName, description, location, name, issue, place } =
  //   issuesContext();
  //console.log("props", props);
  return (
    <div className={styles.main}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.placeholder}>
        {" "}
        <input
          placeholder={props.placeHolder}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          className={styles.phInner}
        />
      </div>
    </div>
  );
}
