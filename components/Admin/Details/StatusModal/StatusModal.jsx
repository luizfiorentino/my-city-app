import React from "react";
import styles from "./StatusModal.module.css";

export default function StatusMessage({ open, onClose, updateStatus }) {
  if (!open) return null;

  const submit = () => {
    updateStatus();
    onClose();
  };

  return (
    <div className={styles.modalContainer}>
      <p style={{ color: "black" }}>
        Are you sure you want to change the status?
      </p>
      <button onClick={submit}>Confirm</button>
    </div>
  );
}
