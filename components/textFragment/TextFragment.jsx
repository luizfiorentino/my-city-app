import React from "react";
import styles from "./TextFragment.module.css";

export default function TextFragment({ className, ...props }) {
  console.log("className", className);
  return <p className={className}>{props.children}</p>;
}
