import React from "react";
import styles from "./Avatar.module.css";
import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session } = useSession();

  return (
    <div className={styles.main}>
      <img
        className={styles.image}
        src={session?.user?.image}
        alt="user avatar"
      />
    </div>
  );
}
