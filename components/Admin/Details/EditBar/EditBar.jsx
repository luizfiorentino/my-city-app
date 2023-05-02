import React, { useState, useEffect, useContext } from "react";
import styles from "./EditBar.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import axios from "axios";
import StatusModal from "../StatusModal/StatusModal";
import IssueContext from "@/utils/IssueContext";

import { dateFormat } from "@/utils/serialize";

export default function StatusCard({
  arrayChanges,
  issueStatus,
  issueDate,
  issueMessage,
  addStatus,
}) {
  const dayjs = require("dayjs");
  const context = useContext(IssueContext);

  const changesOrderedByDate = arrayChanges.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  // const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  function close(e) {
    if (e.target.id === "overlay") {
      context.setOpenModal(false);
    }
  }

  const [status, setStatus] = useState(changesOrderedByDate[0]["status"]);
  const updateStatus = async (message) => {
    try {
      context.setLoading(true);
      const response = await axios.post(`../../api/statusChanges`, {
        statusChange: {
          status: status,
          message: message,
          issueId: arrayChanges[0]["issueId"],
        },
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

  const submit = () => {
    updateStatus(message);
  };

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Done",
  ];

  const currentMessage = changesOrderedByDate[0]["message"];

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <div className={styles.topCard}>
        <div className={styles.topCardInner}>
          <TextParagraph className={styles.status}>Status</TextParagraph>
          {/* <div className={styles.rightSection}> */}

          <div className={styles.editStstusButton}>
            <TextBold variant="orangeButton" className={styles.pending}>
              · {status}
            </TextBold>
          </div>
        </div>
        <div className={styles.buttonsPannel}>
          {!context.openModal && (
            <button
              onClick={() => context.setOpenModal(true)}
              className={styles.buttonEdit}
            >
              <TextBold size="large" className={styles.editButton}>
                Edit
              </TextBold>
            </button>
          )}
          {!context.openModal && (
            <button
              onClick={() => context.setOpenModal(true)}
              className={styles.buttonEdit}
            >
              <TextBold
                size="large"
                className={`${styles.editButton} ${styles.deleteButton}`}
              >
                Delete
              </TextBold>
            </button>
          )}
          {!context.openModal && (
            <button
              onClick={() => context.setOpenModal(true)}
              className={styles.buttonEdit}
            >
              <TextBold
                size="large"
                className={`${styles.editButton} ${styles.solvedButton}`}
              >
                Mark as solved
              </TextBold>
            </button>
          )}
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
        />
      </div>
    </BackgroundCanvas>
  );
}

{
}
