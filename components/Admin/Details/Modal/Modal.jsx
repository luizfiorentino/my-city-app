import { useContext } from "react";
import React from "react";
import styles from "./Modal.module.css";
import IssueContext from "@/utils/IssueContext";

export default function StatusModal({ children, ...props }) {
  const { openModal, setOpenModal } = useContext(IssueContext);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  if (!openModal) return null;

  return (
    <div
      id="overlay"
      className={`${openModal && styles.overlay}`}
      onClick={openModal && close}
    >
      <div {...props} className={styles.modalContainer}>
        {children}
      </div>
    </div>
  );
}
