import React from "react";
import styles from "./AdminTopBar.module.css";
import AdminTbIcon from "../../Nav/AdminTopBarIcon";
import Avatar from "../../Nav/Avatar";
import { GoSignOut } from "react-icons/go";
import { signOut } from "next-auth/react";

export default function AdminTopBar() {
  return (
    <div className={styles.main}>
      <AdminTbIcon />
      <div className={styles.profile}>
        <span onClick={() => signOut()}>
          <div className={styles.smallIcon}>
            <GoSignOut className={styles.signOutIcon} />
          </div>
        </span>

        <Avatar />
      </div>
    </div>
  );
}
