import React from "react";
import styles from "./DetailsPlate.module.css";
import TextFragment from "../textFragment/TextFragment";
import BackgroundCanvas from "../backgroundCanvas/BackgroundCanvas";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
}) {
  let month;
  if (createdAt.substring(5, 7) === "01") {
    month = "Jan";
  }
  if (createdAt.substring(5, 7) === "02") {
    month = "Feb";
  }
  if (createdAt.substring(5, 7) === "03") {
    month = "Mar";
  }
  if (createdAt.substring(5, 7) === "04") {
    month = "Apr";
  }
  if (createdAt.substring(5, 7) === "05") {
    month = "May";
  }
  if (createdAt.substring(5, 7) === "06") {
    month = "Jun";
  }
  if (createdAt.substring(5, 7) === "07") {
    month = "Jul";
  }
  if (createdAt.substring(5, 7) === "08") {
    month = "Aug";
  }
  if (createdAt.substring(5, 7) === "09") {
    month = "Sep";
  }
  if (createdAt.substring(5, 7) === "10") {
    month = "Oct";
  }
  if (createdAt.substring(5, 7) === "11") {
    month = "Nov";
  }
  if (createdAt.substring(5, 7) === "12") {
    month = "Dec";
  }

  let prefix;
  if (createdAt.substring(8, 10) === "1") {
    prefix = "st";
  }
  if (createdAt.substring(8, 10) === "2") {
    prefix = "nd";
  }
  if (createdAt.substring(8, 10) === "3") {
    prefix = "rd";
  } else {
    prefix = "th";
  }

  const date = `${createdAt.substring(
    8,
    10
  )}${prefix} ${month} ${createdAt.substring(0, 4)}`;
  console.log("date", date);
  return (
    <BackgroundCanvas className={styles.detailsMain}>
      <div className={styles.top}>
        <TextFragment className={styles.id}>
          <span className={styles.idHeader}>
            <span className={styles.hash}>#</span>id
          </span>
          {id}
        </TextFragment>
        <TextFragment className={styles.header}>
          <span className={`${styles.sub} ${styles.rightSide}`}>Submited</span>
          {/* {createdAt.substring(0, 10)} */}
          {date}
        </TextFragment>
      </div>
      <div className={styles.bottom}>
        <TextFragment className={styles.header}>
          <span className={styles.sub}>By</span> {userName}
        </TextFragment>
        <TextFragment className={styles.header}>
          <span className={`${styles.sub} ${styles.rightSide}`}>Location</span>
          {location}
        </TextFragment>
      </div>{" "}
      <label>Description</label>
      <TextFragment className={styles.description}>{description}</TextFragment>
    </BackgroundCanvas>
  );
}
