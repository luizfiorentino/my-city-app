import React from "react";
import styles from "./DetailsPlate.module.css";
import TextFragment from "../textFragment/TextFragment";
import BackgroundCanvas from "../backgroundCanvas/BackgroundCanvas";
import TextParagraph from "../textParagraph/TextParagraph";
import HashItem from "../hashItem/HashItem";
import TextBold from "../textBold/TextBold";

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

  return (
    // <BackgroundCanvas className={`${styles.lighterText} ${styles.detailsMain}`}>
    <BackgroundCanvas className={styles.detailsMain}>
      <div className={styles.top}>
        <div>
          <HashItem
            variant={`${styles.idLargeScreen} ${styles.smallerSpacing}`}
          >
            id
          </HashItem>{" "}
          <TextParagraph>{id}</TextParagraph>
        </div>

        <TextFragment className={`${styles.bolderText} ${styles.header}`}>
          {/* <span
            className={`${styles.lighterText} ${styles.sub} ${styles.rightSide}`}
          >
            Submited
          </span> */}
        </TextFragment>
        <div className={`${styles.sub} ${styles.right}`}>
          <TextParagraph
            variant={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Submited
          </TextParagraph>
          <TextBold variant={styles.largeSpacing}>{date}</TextBold>
        </div>
      </div>
      <div className={styles.bottom}>
        {/* <TextFragment className={`${styles.bolderText} ${styles.header}`}>
          <span className={`${styles.lighterText} ${styles.sub}`}>By</span>{" "}
          {userName}
        </TextFragment> */}
        <div>
          <TextParagraph variant={styles.defaultSpacing}>By</TextParagraph>
          <TextBold variant={styles.largeSpacing}>{userName}</TextBold>
        </div>

        {/* <TextFragment className={`${styles.bolderText} ${styles.header}`}>
          <span
            className={`${styles.lighterText} ${styles.sub} ${styles.rightSide}`}
          >
            Location
          </span>
          {location}
        </TextFragment> */}
        <div className={`${styles.sub} ${styles.right}`}>
          <TextParagraph
            variant={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Location
          </TextParagraph>
          <TextBold variant={styles.largeSpacing}>{location}</TextBold>
        </div>
      </div>
      <TextParagraph variant={styles.smallerSpacing}>Description</TextParagraph>
      <TextParagraph variant={styles.description}>{description}</TextParagraph>
    </BackgroundCanvas>
  );
}
