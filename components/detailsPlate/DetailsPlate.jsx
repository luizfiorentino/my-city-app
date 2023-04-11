import React from "react";
import styles from "./DetailsPlate.module.css";
import TextFragment from "../textFragment/TextFragment";
import BackgroundCanvas from "../backgroundCanvas/BackgroundCanvas";
import TextParagraph from "../textParagraph/TextParagraph";
import HashItem from "../hashItem/HashItem";
import TextBold from "../textBold/TextBold";
import { dateFormat } from "@/utils/serialize";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
}) {
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
            className={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Submited
          </TextParagraph>
          <TextBold variant={styles.largeSpacing}>
            {dateFormat(createdAt)}
          </TextBold>
        </div>
      </div>
      <div className={styles.bottom}>
        {/* <TextFragment className={`${styles.bolderText} ${styles.header}`}>
          <span className={`${styles.lighterText} ${styles.sub}`}>By</span>{" "}
          {userName}
        </TextFragment> */}
        <div>
          <TextParagraph className={styles.defaultSpacing}>By</TextParagraph>
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
            className={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Location
          </TextParagraph>
          <TextBold variant={styles.largeSpacing}>{location}</TextBold>
        </div>
      </div>
      <TextParagraph className={styles.smallerSpacing}>
        Description
      </TextParagraph>
      <BackgroundCanvas className={styles.description}>
        <TextParagraph variant="whiteText">{description}</TextParagraph>
      </BackgroundCanvas>
    </BackgroundCanvas>
  );
}
