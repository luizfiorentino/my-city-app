import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input placeholder={props.placeHolder} />
    </div>
  );
}
