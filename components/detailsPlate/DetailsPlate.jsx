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
      <p>ID#AMS{id}</p>
      <p>Submited at: {createdAt.substring(0, 10)}</p>
      <p>User: {userName}</p>
      <p className={styles.location}>Location: {location}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
