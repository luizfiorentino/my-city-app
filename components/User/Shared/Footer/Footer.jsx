import React from "react";
import styles from "./Footer.module.css";
import Button from "@/components/Shared/Button/Button";

export default function Footer(props) {
  return (
    <div className={styles.main}>
      <Button onClick={props.onClick} variant="postIssue">
        {props.children}
      </Button>
    </div>
  );
}
