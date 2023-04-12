import React from "react";
import imgAvatar from "../../../../pages/assets/images/image-avatar.jpg";
import styles from "./Avatar.module.css";

export default function Avatar() {
  return (
    <div className={styles.main}>
      <img className={styles.image} src={imgAvatar.src} alt="admin avatar" />
    </div>
  );
}
