import React from "react";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import HashItem from "../../List/HashItem";
import TextBold from "../../Shared/Typography/TextBold";
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
        <TextParagraph variant="whiteText" size="large">
          {description}
        </TextParagraph>
      </BackgroundCanvas>
    </BackgroundCanvas>
  );
}
