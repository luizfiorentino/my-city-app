import React, { useContext } from "react";
import styles from "./Footer.module.css";
import Button from "@/components/Shared/Button/Button";
import IssueContext from "@/utils/IssueContext";

export default function Footer({
  goBack,
  goForward,
  isGoForwardDisabled,
  variant,
  children,
}) {
  // const { loading, buttonInactive, latitude } = useContext(IssueContext);

  return (
    <div
      className={`${goBack ? styles.backBtn : styles.main} ${
        variant ? styles[variant] : null
      }`}
    >
      {goBack && (
        <Button onClick={goBack} variant="goBack" type="button">
          Go back
        </Button>
      )}
      <Button
        onClick={goForward}
        disabled={isGoForwardDisabled}
        variant={variant === "submitInfos" ? "purple" : "postIssue"}
        type="submit"
        className={variant === "submitInfos" ? styles.purple : null}
      >
        {children}
      </Button>
    </div>
  );
}
