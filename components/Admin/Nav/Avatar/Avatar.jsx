import React from "react";
import styles from "./Avatar.module.css";
import { useContext } from "react";
import IssueContext from "@/utils/IssueContext";

export default function Avatar() {
  const context = useContext(IssueContext);
  return (
    <div className={styles.main}>
      <img
        className={styles.image}
        src={context?.signedInAs?.user?.image}
        alt="admin avatar"
      />
    </div>
  );
}
