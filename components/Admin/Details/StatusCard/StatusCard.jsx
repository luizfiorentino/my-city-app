import React, { useState, useEffect, use } from "react";
import styles from "./StatusCard.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import axios from "axios";
import StatusModal from "../StatusModal/StatusModal";
import { set } from "zod";

export default function StatusCard({ arrayChanges }) {
  const dayjs = require("dayjs");
  const changesOrderedByDate = arrayChanges.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  console.log("openModal", openModal);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  console.log("statu card", changesOrderedByDate[0]["message"]);

  const [status, setStatus] = useState(changesOrderedByDate[0]["status"]);
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

  const dateTest = arrayChanges.map((date) => {
    return dayjs(date.createdAt);
  });

  //console.log("ordered by date", changesOrderedByDate);
  console.log("array changes sttus card", arrayChanges);

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Done",
  ];

  console.log("STATUS", status);

  const currentMessage = changesOrderedByDate[0]["message"];

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <BackgroundCanvas className={styles.statusCardContainer}>
      <div className={styles.topCard}>
        <TextParagraph className={styles.status}>Status</TextParagraph>
        <TextBold variant="orangeButton" className={styles.pending}>
          · {status}{" "}
        </TextBold>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {buttonOptions.map((option) => (
            <option key={option}> {option} </option>
          ))}
        </select>
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
        <BackgroundCanvas
          variant="lighterCanvas"
          className={styles.messageCanvas}
        >
          {!message ? currentMessage : message}
        </BackgroundCanvas>
      </div>
    </BackgroundCanvas>
  );
}

{
  /* <TextBold variant="orangeButton" className={styles.pending}>
· {changesOrderedByDate[0]["status"]}{" "}
</TextBold> */
}
