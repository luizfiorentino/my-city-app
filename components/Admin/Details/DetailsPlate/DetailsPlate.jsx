import React, { useState } from "react";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { dateFormat } from "@/utils/serialize";
import StatusMessage from "../StatusMessage/StatusMessage";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
}) {
  const [openModal, setOpenModal] = useState(false);
  console.log("openModal", openModal);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  return (
    <BackgroundCanvas className={styles.detailsMain}>
      <button onClick={() => setOpenModal(true)}>Modal</button>
      <div
        id="overlay"
        className={`${openModal === true ? styles.overlay : undefined}`}
        onClick={openModal ? close : null}
      >
        <StatusMessage open={openModal} onClose={() => setOpenModal(false)} />
      </div>{" "}
      <div className={styles.top}>
        <div className={styles.id}>
          <div className={`${styles.idInner} ${styles.idSpacing}`}>
            <TextBold variant="hash">#</TextBold>
            <TextBold variant={styles.idLargeScreen}>id</TextBold>{" "}
          </div>

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
