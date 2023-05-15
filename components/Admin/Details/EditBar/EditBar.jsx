import React, { useState, useEffect, useContext } from "react";
import styles from "./EditBar.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import axios from "axios";
import StatusModal from "../StatusModal/StatusModal";
import IssueContext from "@/utils/IssueContext";
import LoaderImage from "../../../../pages/assets/images/Loading_icon.gif";
import dayjs from "dayjs";

import { dateFormat } from "@/utils/serialize";
import {
  sendDeleteRequest,
  sendSolvedUpdateRequest,
  sendUpdateIssueRequest,
} from "@/services";

export default function EditBar({
  arrayChanges,
  issueStatus,
  issueDate,
  issueMessage,
  addStatus,
  issueId,
}) {
  // const dayjs = require("dayjs");
  const context = useContext(IssueContext);

  const changesOrderedByDate = arrayChanges.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const lastSavedStatus = changesOrderedByDate[0]["status"];

  // const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonMode, setButtonMode] = useState("");
  const [status, setStatus] = useState(lastSavedStatus);
  console.log("EDITBAR test console log", issueId, "button mode", buttonMode);

  function close(e) {
    if (e.target.id === "overlay") {
      context.setOpenModal(false);
    }
  }

  const updateStatus = async (message) => {
    try {
      context.setLoading(true);

      switch (buttonMode) {
        case "edit":
          await sendUpdateIssueRequest(status, message, issueId);
          break;
        case "solved":
          await sendSolvedUpdateRequest(issueId);
          break;
        case "delete":
          await sendDeleteRequest(issueId);
          break;
      }
      context.setLoading(false);
      context.setOpenModal(false);
    } catch (e) {
      console.log(e.message);
      context.setLoading(false);
    }

    // const submit = () => {
    //   updateStatus(message);
    // };
    const submit = () => {
      updateStatus(message);
    };

    const buttonOptions = [
      "Submitted",
      "On progress",
      "Information needed",
      "Solved",
    ];

    const currentMessage = changesOrderedByDate[0]["message"];

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

    const deleteIssue = async () => {
      console.log("clicked");
      try {
        context.setLoading(true);

        const response =
          (`../../api/issues/${issueId}`,
          {
            object: { id: issueId, something: 123 },
          });
        // window.location.reload();
        context.setLoading(false);
        addStatus(response.data.newChange);
        context.setOpenModal(false);

        console.log("NEW STATUS", response.data.newChange);
      } catch (e) {
        console.log(e.message);
        context.setLoading(false);
      }
    };

    return (
      <BackgroundCanvas className={styles.statusCardContainer}>
        <div className={styles.topCard}>
          <div className={styles.topCardInner}>
            <button onClick={deleteIssue}>delete</button>
            <TextParagraph className={styles.status}>Status</TextParagraph>
            {/* <div className={styles.rightSection}> */}

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
          <div className={styles.buttonsPannel}>
            <button onClick={clickEdit} className={styles.buttonEdit}>
              <TextBold size="large" className={styles.editButton}>
                Edit
              </TextBold>
            </button>

            <button onClick={clickDelete} className={styles.buttonEdit}>
              <TextBold
                size="large"
                className={`${styles.editButton} ${styles.deleteButton}`}
              >
                Delete
              </TextBold>
            </button>

            <button onClick={clickSolved} className={styles.buttonEdit}>
              <TextBold
                size="large"
                className={`${styles.editButton} ${styles.solvedButton}`}
              >
                Mark as solved
              </TextBold>
            </button>
          </div>
        </div>

        <div
          id="overlay"
          className={`${context.openModal && styles.overlay}`}
          onClick={context.openModal && close}
        >
          <StatusModal
            open={context.openModal}
            onClose={() => context.setOpenModal(false)}
            updateStatus={updateStatus}
            message={message}
            setMessage={setMessage}
            submit={submit}
            buttonOptions={buttonOptions}
            status={status}
            setStatus={setStatus}
          >
            <TextBold
              variant="higherLine"
              className={styles.confirmationMessage}
            >
              {buttonMode === "delete" || buttonMode === "solved"
                ? undefined
                : "Select a new status if necessary"}
            </TextBold>
            <TextBold
              variant="higherLine"
              className={
                buttonMode === "delete" ? styles.confirmationMessage : undefined
              }
            >
              {buttonMode === "delete"
                ? "Are you sure you want to delete this issue?"
                : undefined}
            </TextBold>
            <TextBold
              variant="higherLine"
              className={
                buttonMode === "solved" ? styles.confirmationMessage : undefined
              }
            >
              {buttonMode === "solved"
                ? "Are you sure you want to mark this issue as solved?"
                : undefined}
            </TextBold>

            <div className={styles.selector}>
              {buttonMode === "delete" ||
              buttonMode === "solved" ? undefined : (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.selectorInner}
                >
                  {buttonOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>

            <TextBold
              variant="higherLine"
              className={styles.confirmationMessage}
            >
              {buttonMode === "delete" || buttonMode === "solved"
                ? undefined
                : "Enter a message related to it"}{" "}
            </TextBold>
            {buttonMode === "delete" || buttonMode === "solved" ? undefined : (
              <textarea
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                className={styles.textArea}
              />
            )}

            <div className={styles.buttons}>
              <button
                onClick={submit}
                className={styles.button}
                disabled={
                  buttonMode === "edit"
                    ? message.length <= 4 || context.loading
                    : undefined
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
          </StatusModal>
        </div>
      </BackgroundCanvas>
    );
  };
}
