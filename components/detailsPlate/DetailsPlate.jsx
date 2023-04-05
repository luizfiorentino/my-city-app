import React from "react";
import styles from "./DetailsPlate.module.css";

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
    <div className={styles.detailsMain}>
      <p className={styles.id}>
        <span className={styles.idHeader}>ID#AMS</span>
        {id}
      </p>
      <p className={styles.header}>
        <span className={styles.id}>Submited at</span>
        {/* {createdAt.substring(0, 10)} */}
        {date}
      </p>
      <p className={styles.header}>
        <span className={styles.id}>By</span> {userName}
      </p>
      <p className={styles.header}>
        <span className={styles.id}>Location</span>
        {location}
      </p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
