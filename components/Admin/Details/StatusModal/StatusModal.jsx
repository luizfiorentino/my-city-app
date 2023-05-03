import React, { useState, useContext } from "react";
import styles from "./StatusModal.module.css";
import IssueContext from "@/utils/IssueContext";

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
  ...props
}) {
  if (!open) return null;

  const context = useContext(IssueContext);
  return <div {...props} className={styles.modalContainer}></div>;
}
