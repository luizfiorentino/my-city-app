import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import styles from "./EditBar.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import Modal from "../Modal/Modal";
import IssueContext from "@/utils/IssueContext";
import Button from "@/components/Shared/Button/Button";
import StatusBanner from "../StatusBanner/StatusBanner";

export default function EditBar({ arrayChanges, updateStatus, footer }) {
  const context = useContext(IssueContext);
  const changesOrderedByDate = arrayChanges?.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const lastSavedStatus = changesOrderedByDate
    ? changesOrderedByDate[0]["status"]
    : null;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(lastSavedStatus);

  const submit = () => {
    updateStatus(message, status, context.buttonMode);
  };

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Solved",
  ];

  const clickDelete = () => {
    context.setButtonMode("delete");
    context.setOpenModal(true);
  };

  const clickEdit = () => {
    context.setButtonMode("edit");
    context.setOpenModal(true);
  };

  const clickSolved = () => {
    context.setButtonMode("solved");
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

          <div>
            <StatusBanner
              variant={lastSavedStatus === "Solved" ? "solved" : "primary"}
              className={styles.pending}
            >
              · {changesOrderedByDate && changesOrderedByDate[0]["status"]}
            </StatusBanner>
          </div>
        </div>
        <div
          className={
            footer === false ? styles.buttonsPannel : styles.buttonsPannelFooter
          }
        >
          <Button variant="dark" onClick={clickEdit}>
            Edit
          </Button>

          <Button variant="danger" onClick={clickDelete}>
            Delete
          </Button>

          <Button onClick={clickSolved}>Mark as solved</Button>
        </div>
      </div>

      <Modal>
        <TextBold className={styles.confirmationMessage}>
          {modalMessages[context.buttonMode]}
        </TextBold>

        {context.buttonMode === "edit" && (
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
          <Button
            onClick={submit}
            disabled={
              (context.buttonMode === "edit" && message.length <= 4) ||
              context.loading
            }
            loading={context.loading}
          >
            Confirm
          </Button>

          <Button onClick={() => context.setOpenModal(false)} variant="light">
            Cancel
          </Button>
        </div>
      </Modal>
    </BackgroundCanvas>
  );
}
