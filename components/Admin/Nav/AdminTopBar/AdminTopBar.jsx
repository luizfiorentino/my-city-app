import React from "react";
import styles from "./AdminTopBar.module.css";
import AdminTbIcon from "../../Nav/AdminTopBarIcon";
import Avatar from "../../Nav/Avatar";
import { GoSignOut } from "react-icons/go";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import IssueContext from "@/utils/IssueContext";

export default function AdminTopBar() {
  const context = useContext(IssueContext);
  return (
    <div className={styles.main}>
      <AdminTbIcon />
      <div className={styles.signedInAs}>
        <p>
          Signed in as{" "}
          <span className={styles.userEmail}>{context.signedInAs}</span>
        </p>
      </div>

      <div className={styles.profile}>
        {/* <span className={styles.smallIcon}></span> */}
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
