import React from "react";
import styles from "./AdminTopBar.module.css";
import AdminTbIcon from "../AdminTopBarIcon/AdminTbIcon";
import Avatar from "../Avatar/Avatar";

export default function AdminTopBar() {
  return (
    <div className={styles.main}>
      <AdminTbIcon />
      <div className={styles.profile}>
        <span className={styles.smallIcon}></span>
        <Avatar />
      </div>
    </div>
  );
}
