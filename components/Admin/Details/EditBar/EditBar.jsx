import React, { useState, useContext } from "react";
import styles from "./EditBar.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import Modal from "../Modal/Modal";
import IssueContext from "@/utils/IssueContext";
import LoaderImage from "../../../../pages/assets/images/Loading_icon.gif";
import dayjs from "dayjs";
import Button from "@/components/Shared/Button/Button";

export default function EditBar({ arrayChanges, updateStatus, footer }) {
  const context = useContext(IssueContext);

  const changesOrderedByDate = arrayChanges.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const lastSavedStatus = changesOrderedByDate[0]["status"];

  const [message, setMessage] = useState("");
  const [buttonMode, setButtonMode] = useState("");
  const [status, setStatus] = useState(lastSavedStatus);

  const submit = () => {
    updateStatus(message, status, buttonMode);
  };

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Solved",
  ];

  const clickDelete = () => {
    setButtonMode("delete");
    context.setOpenModal(true);
  };

  const clickEdit = () => {
    setButtonMode("edit");
    context.setOpenModal(true);
  };

  const clickSolved = () => {
    setButtonMode("solved");
    context.setOpenModal(true);
  };

  const modalMessages = {
    delete: "Are you sure you want to delete this issue?",
    solved: "Are you sure you want to mark this issue as solved?",
    edit: "Select a new status if necessary",
  };

  return (
    <BackgroundCanvas
      className={
        footer === false ? styles.statusCardContainer : styles.hiddenBar
      }
    >
      <div className={styles.topCard}>
        <div
          className={
            footer === false ? styles.topCardInner : styles.topCardHidden
          }
        >
          <TextParagraph className={styles.status}>Status</TextParagraph>
          <Button>Test</Button>
          <div className={styles.editStstusButton}>
            <TextBold
              variant={
                lastSavedStatus === "Solved" ? "greenButton" : "orangeButton"
              }
              className={styles.pending}
            >
              · {changesOrderedByDate[0]["status"]}
            </TextBold>
          </div>
        </div>
        <div
          className={
            footer === false ? styles.buttonsPannel : styles.buttonsPannelFooter
          }
        >
          {/* <button onClick={clickEdit} className={styles.buttonEdit}>
            <TextBold size="large" className={styles.editButton}>
              Edit
            </TextBold>
          </button> */}
          <Button variant="dark" onClick={clickEdit}>
            Edit
          </Button>

          {/* <button onClick={clickDelete} className={styles.buttonEdit}>
            <TextBold
              size="large"
              className={`${styles.editButton} ${styles.deleteButton}`}
            >
              Delete
            </TextBold>
          </button> */}
          <Button variant="danger" onClick={clickDelete}>
            Edit
          </Button>

          {/* <button onClick={clickSolved} className={styles.buttonEdit}>
            <TextBold
              size="large"
              className={`${styles.editButton} ${styles.solvedButton}`}
            >
              Mark as solved
            </TextBold>
          </button> */}
          <Button onClick={clickSolved}>Mar as solved</Button>
        </div>
      </div>

      <Modal>
        {/* <TextBold variant="higherLine" className={styles.confirmationMessage}>
          {buttonMode === "edit" && "Select a new status if necessary"}
        </TextBold>
        <TextBold variant="higherLine" className={styles.confirmationMessage}>
          {" "}
          {buttonMode === "delete" &&
            "Are you sure you want to delete this issue?"}
        </TextBold>
        <TextBold variant="higherLine" className={styles.confirmationMessage}>
          {" "}
          {buttonMode === "solved" &&
            "Are you sure you want to mark this issue as solved?"}
        </TextBold> */}
        <TextBold className={styles.confirmationMessage}>
          {modalMessages[buttonMode]}
        </TextBold>

        {buttonMode === "edit" && (
          <>
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
            <TextBold
              variant="higherLine"
              className={styles.confirmationMessage}
            >
              Enter a message related to it
            </TextBold>

            <textarea
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textArea}
            />
          </>
        )}

        <div className={styles.buttons}>
          <button
            onClick={submit}
            className={styles.button}
            disabled={
              (buttonMode === "edit" && message.length <= 4) || context.loading
            }
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
                  (buttonMode === "edit" && message.length <= 4) ||
                  (buttonMode === "edit" && context.loading)
                    ? "purpleButtonInactive"
                    : "purpleButton"
                }
              >
                Confirm
              </TextBold>
            )}
          </button>

          <button
            onClick={() => context.setOpenModal(false)}
            className={styles.button}
          >
            <TextBold variant="redButton" className={styles.confirmText}>
              Cancel
            </TextBold>
          </button>
        </div>
      </Modal>
    </BackgroundCanvas>
  );
}
