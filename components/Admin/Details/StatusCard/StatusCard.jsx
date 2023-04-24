import React, { useState, useEffect, use } from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import axios from "axios";
import StatusModal from "../StatusModal/StatusModal";
import { set } from "zod";

export default function StatusCard({
  arrayChanges,
  issueStatus,
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
        <TextParagraph className={styles.status}>Status</TextParagraph>
        {isHistory === false ? (
          <TextBold variant="orangeButton" className={styles.pending}>
            · {status}{" "}
          </TextBold>
        ) : undefined}
        {isHistory === true ? (
          <TextBold variant="orangeButton" className={styles.pending}>
            · {issueStatus}{" "}
          </TextBold>
        ) : undefined}

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

        {/* <button onClick={updateStatus}>change</button> */}
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
          />
          {openModal ? undefined : (
            <button onClick={() => setOpenModal(true)}>change</button>
          )}
        </div>
      </div>
      <div className={styles.currentMessage}>
        <TextParagraph>Current status</TextParagraph>
        {isHistory === false ? (
          <BackgroundCanvas
            variant="lighterCanvas"
            className={styles.messageCanvas}
          >
            {!message ? currentMessage : message}
          </BackgroundCanvas>
        ) : undefined}
        {isHistory === true ? (
          <BackgroundCanvas
            variant="lighterCanvas"
            className={styles.messageCanvas}
          >
            {issueMessage}
          </BackgroundCanvas>
        ) : undefined}
      </div>
    </BackgroundCanvas>
  );
}

{
  /* <TextBold variant="orangeButton" className={styles.pending}>
· {changesOrderedByDate[0]["status"]}{" "}
</TextBold> */
}
