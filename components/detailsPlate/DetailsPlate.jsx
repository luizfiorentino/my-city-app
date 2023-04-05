import React from "react";
import styles from "./DetailsPlate.module.css";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
}) {
  return (
    <div className={styles.detailsMain}>
      <p className={styles.id}>
        <span className={styles.idHeader}>ID#AMS</span>
        {id}
      </p>
      <p className={styles.header}>
        <span className={styles.id}>Submited at</span>
        {createdAt.substring(0, 10)}
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
