import React from "react";
import styles from "./DetailsPlate.module.css";
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
    <BackgroundCanvas className={styles.detailsMain}>
      <div className={styles.top}>
        <div>
          <HashItem
            variant={`${styles.idLargeScreen} ${styles.smallerSpacing}`}
          >
            id
          </HashItem>{" "}
          <TextParagraph className={styles.header}>{id}</TextParagraph>
        </div>

        <div className={`${styles.sub} ${styles.right}`}>
          <TextParagraph
            className={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Submited
          </TextParagraph>
          <TextBold className={styles.largeSpacing}>
            {dateFormat(createdAt)}
          </TextBold>
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <TextParagraph className={styles.defaultSpacing}>By</TextParagraph>
          <TextBold className={styles.largeSpacing}>{userName}</TextBold>
        </div>
        <div className={`${styles.sub} ${styles.right}`}>
          <TextParagraph
            className={`${styles.defaultSpacing} ${styles.rightSide}`}
          >
            Location
          </TextParagraph>
          <TextBold className={styles.largeSpacing}>{location}</TextBold>
        </div>
      </div>
      <TextParagraph className={styles.smallerSpacing}>
        Description
      </TextParagraph>
      <BackgroundCanvas variant="lighterCanvas" className={styles.description}>
        <TextParagraph variant="whiteText">{description}</TextParagraph>
      </BackgroundCanvas>
    </BackgroundCanvas>
  );
}
