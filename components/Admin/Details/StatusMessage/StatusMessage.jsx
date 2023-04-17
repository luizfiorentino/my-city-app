import React from "react";
import styles from "./StatusMessage.module.css";

export default function StatusMessage({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div className={styles.modalContainer}>
        <p>Status changed</p>
      </div>
      StatusMessage
    </div>
  );
}
