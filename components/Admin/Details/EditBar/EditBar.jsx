import React, { useState, useEffect } from "react";
import styles from "./EditBar.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import axios from "axios";
import StatusModal from "../StatusModal/StatusModal";
import { date, set } from "zod";
import { dateFormat } from "@/utils/serialize";

export default function StatusCard({
  arrayChanges,
  issueStatus,
  issueDate,
  issueMessage,
  isHistory,
}) {
  const dayjs = require("dayjs");

  const changesOrderedByDate =
    isHistory === false
      ? arrayChanges.sort((a, b) => {
          return dayjs(b.createdAt) - dayjs(a.createdAt);
        })
      : undefined;

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  console.log("openModal", openModal);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  //console.log("statu card", changesOrderedByDate[0]["message"]);

  const [status, setStatus] = useState(
    isHistory === false ? changesOrderedByDate[0]["status"] : "not applied"
  );
  const updateStatus = async (message) => {
    try {
      const newStatus = await axios.post(`../../api/statusChanges`, {
        statusChange: {
          status: status,
          message: message,
          issueId: arrayChanges[0]["issueId"],
        },
      });

      //console.log("NEW STATUS", newStatus);
    } catch (e) {
      console.log(e.message);
    }
  };

  const submit = () => {
    updateStatus(message);
    setOpenModal(false);
    // setMessage("");
  };

  // const dateTest = arrayChanges.map((date) => {
  //   return dayjs(date.createdAt);
  // });

  //console.log("ordered by date", changesOrderedByDate);
  //console.log("array changes sttus card", arrayChanges);

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Done",
  ];

  console.log("STATUS", status);

  const currentMessage =
    isHistory === false ? changesOrderedByDate[0]["message"] : "not applied";

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <div className={styles.topCard}>
        <div className={styles.topCardInner}>
          <TextParagraph className={styles.status}>Status</TextParagraph>
          {/* <div className={styles.rightSection}> */}
          {isHistory === false ? (
            // <div className={styles.editStstusButton}>
            <TextBold variant="orangeButton" className={styles.pending}>
              · {status}
            </TextBold>
          ) : (
            // </div>
            <TextBold variant="orangeButton">· {issueStatus}</TextBold>
          )}{" "}
        </div>
        <div className={styles.buttonsPannel}>
          {openModal || isHistory === true ? undefined : (
            <button
              onClick={() => setOpenModal(true)}
              className={styles.buttonEdit}
            >
              <TextBold size="large" className={styles.editButton}>
                Edit
              </TextBold>
            </button>
          )}
          {openModal || isHistory === true ? undefined : (
            <button
              onClick={() => setOpenModal(true)}
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
          {openModal || isHistory === true ? undefined : (
            <button
              onClick={() => setOpenModal(true)}
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
      {/* <div className={isHistory === false ? styles.editParts : styles.hidden}> */}
      <div
        id="overlay"
        className={`${openModal === true ? styles.overlay : undefined}`}
        onClick={openModal ? close : null}
      >
        <StatusModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          updateStatus={updateStatus}
          message={message}
          setMessage={setMessage}
          submit={submit}
          isHistory={isHistory}
          buttonOptions={buttonOptions}
          setStatus={setStatus}
        />
      </div>
      {/* </div> */}
      {/* <div className={styles.currentMessage}> */}
      <TextParagraph>
        {isHistory === false ? null : dateFormat(issueDate)}
      </TextParagraph>
      {/* {isHistory === false ? (
        <BackgroundCanvas
          variant="lighterCanvas"
          className={styles.messageCanvas}
        >
          {!message ? currentMessage : message}
        </BackgroundCanvas>
      ) : undefined} */}
      {isHistory === true ? (
        <BackgroundCanvas
          variant="lighterCanvas"
          className={styles.messageCanvas}
        >
          {issueMessage}
        </BackgroundCanvas>
      ) : undefined}
      {/* </div> */}
    </BackgroundCanvas>
  );
}

{
}
