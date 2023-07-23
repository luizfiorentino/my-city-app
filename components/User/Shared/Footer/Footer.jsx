import React, { useContext } from "react";
import styles from "./Footer.module.css";
import Button from "@/components/Shared/Button/Button";
import IssueContext from "@/utils/IssueContext";

export default function Footer(props) {
  const { loading, buttonInactive } = useContext(IssueContext);

  return (
    <div
      className={`${props.backButton === true ? styles.backBtn : styles.main} ${
        props.variant ? styles[props.variant] : null
      }`}
    >
      {props.backButton === true && (
        <Button onClick={props.onClick2} variant="goBack" type="button">
          Go back
        </Button>
      )}
      <Button
        onClick={props.onClick}
        disabled={loading || buttonInactive}
        variant={props.variant === "submitInfos" ? "purple" : "postIssue"}
        type="submit"
        className={props.variant === "submitInfos" ? styles.purple : null}
      >
        {props.children}
      </Button>
    </div>
  );
}
