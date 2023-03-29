import React from "react";
import styles from "./AdminTopBar.module.css";
import AdminTbIcon from "../adminTopBarIcon/AdminTbIcon";
import Avatar from "../avatar/Avatar";

export default function AdminTopBar() {
  return (
    <div className={styles.main}>
      <AdminTbIcon />
      <Avatar />
    </div>
  );
}
