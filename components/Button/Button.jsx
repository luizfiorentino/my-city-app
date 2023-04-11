import React from "react";
import styles from "./Button.module.css";
import { ubuntu } from "@/styles/fonts";

export default function Button(props) {
  return (
    <button
      type="submit"
      className={`${styles.main} ${ubuntu.className}`}
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
}
