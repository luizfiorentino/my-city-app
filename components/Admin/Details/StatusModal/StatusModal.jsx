import React from "react";
import styles from "./StatusModal.module.css";
import TextBold from "../../Shared/Typography/TextBold/TextBold";
import TextParagraph from "../../Shared/Typography/TextParagraph/TextParagraph";

export default function StatusMessage({ open, onClose, updateStatus }) {
  if (!open) return null;

  const submit = () => {
    updateStatus();
    onClose();
  };

  return (
    <div className={styles.modalContainer}>
      <TextBold variant="higherLine" className={styles.confirmationMessage}>
        Are you sure you want to change the status?
      </TextBold>
      <div className={styles.buttons}>
        <button onClick={submit} className={styles.button}>
          <TextBold variant="purpleButton" className={styles.confirmText}>
            Confirm
          </TextBold>
        </button>
        <button onClick={onClose} className={styles.button}>
          <TextBold variant="redButton" className={styles.confirmText}>
            Cancel
          </TextBold>
        </button>
      </div>
    </div>
  );
}
