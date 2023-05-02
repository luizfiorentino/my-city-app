import React, { useState, useContext } from "react";
import styles from "./StatusModal.module.css";
import TextBold from "../../Shared/Typography/TextBold/TextBold";
import TextParagraph from "../../Shared/Typography/TextParagraph/TextParagraph";
import IssueContext from "@/utils/IssueContext";
import LoadingSpinner from "../../../../pages/assets/images/Iphone-spinner-2.gif";
import Spinner from "../../../Shared/LoaderSpinner";
import LoaderImage from "../../../../pages/assets/images/Loading_icon.gif";

export default function StatusModal({
  open,
  onClose,
  updateStatus,
  message,
  setMessage,
  submit,
  status,
  buttonOptions,
  setStatus,

  hello,
}) {
  if (!open) return null;

  const context = useContext(IssueContext);
  return (
    <div className={styles.modalContainer}>
      <TextBold variant="higherLine" className={styles.confirmationMessage}>
        Select a new status if necessary
      </TextBold>

      <div className={styles.selector}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.selectorInner}
        >
          {buttonOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <TextBold variant="higherLine" className={styles.confirmationMessage}>
        Enter a message related to the new status:
      </TextBold>
      <textarea
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textArea}
      />
      <div className={styles.buttons}>
        <button
          onClick={submit}
          className={styles.button}
          disabled={message.length <= 4 || context.loading}
        >
          {context.loading ? (
            <img
              src={LoaderImage.src}
              className={styles.defaultSpinner}
              alt="loader image"
            />
          ) : (
            <TextBold
              variant={
                message.length >= 4 && !context.loading
                  ? "purpleButton"
                  : "purpleButtonInactive"
              }
            >
              Confirm
            </TextBold>
          )}
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
