import React, { useContext, useEffect } from "react";
import styles from "./Footer.module.css";
import Button from "@/components/Shared/Button/Button";
import IssueContext from "@/utils/IssueContext";

export default function Footer(props) {
  const { loading, buttonInactive } = useContext(IssueContext);

  return (
    <div className={styles.main}>
      <Button
        onClick={props.onClick}
        disabled={loading || buttonInactive}
        variant="postIssue"
      >
        {props.children}
      </Button>
    </div>
  );
}
