import React, { useState } from "react";
import styles from "./StatusModal.module.css";
import TextBold from "../../Shared/Typography/TextBold/TextBold";
import TextParagraph from "../../Shared/Typography/TextParagraph/TextParagraph";

export default function StatusMessage({ open, onClose, updateStatus }) {
  const [message, setMessage] = useState("");

  if (!open) return null;

  const submit = () => {
    updateStatus(message);
    onClose();
    setMessage("");
  };

  return (
    <div className={styles.modalContainer}>
      <TextBold variant="higherLine" className={styles.confirmationMessage}>
        Enter a message related to the new status:
      </TextBold>
      <textarea type="text" onChange={(e) => setMessage(e.target.value)} />
      <div className={styles.buttons}>
        <button
          onClick={submit}
          className={styles.button}
          disabled={message.length <= 4 && true}
        >
          <TextBold
            variant={
              message.length >= 4 ? "purpleButton" : "purpleButtonInactive"
            }
          >
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
