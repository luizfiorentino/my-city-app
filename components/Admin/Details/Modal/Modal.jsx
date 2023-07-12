import { useContext } from "react";
import React from "react";
import styles from "./Modal.module.css";
import IssueContext from "@/utils/IssueContext";

export default function Modal({ children, ...props }) {
  const { openModal, setOpenModal } = useContext(IssueContext);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  if (!openModal) return null;

  return (
    <div id="overlay" className={styles.overlay} onClick={openModal && close}>
      <div {...props} className={styles.modalContainer}>
        {children}
      </div>
    </div>
  );
}
