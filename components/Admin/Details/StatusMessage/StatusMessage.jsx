import React from "react";
import styles from "./StatusMessage.module.css";

export default function StatusMessage({ open, onClose }) {
  if (!open) return null;
  return (
    <div className={styles.modalContainer}>
      <p>Status changed</p>
      <button onClick={onClose}>Submit</button>
    </div>
  );
}
