import React, { useState } from "react";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { dateFormat } from "@/utils/serialize";

import { Pagination } from "@/utils/serialize";
import StatusCard from "../../Details/StatusCard";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
  arrayChanges,
}) {
  //console.log("ARRAY CHANGES ->", arrayChanges);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  console.log("openModal", openModal);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  const arrayHistory = arrayChanges.filter(
    (change) => change !== arrayChanges[0]
  );
  const [historyData, setHistoryData] = useState(arrayHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = historyData.slice(firstCardIndex, lastCardIndex);
  const totalCards = arrayChanges.length;
  console.log(
    "cards per page",
    cardsPerPage,
    "total cards",
    totalCards,
    "currentPage",
    currentPage,
    "currentCards",
    currentCards,
    "arrayHistory",
    arrayHistory
  );

  return (
    <BackgroundCanvas className={styles.detailsMain}>
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
        Current message
      </TextParagraph>

      <BackgroundCanvas variant="lighterCanvas" className={styles.description}>
        <TextParagraph variant="whiteText" size="large">
          {arrayChanges[0].message}
        </TextParagraph>
      </BackgroundCanvas>
      <TextParagraph className={styles.smallerSpacing}>
        Description
      </TextParagraph>

      <BackgroundCanvas variant="lighterCanvas" className={styles.description}>
        <TextParagraph variant="whiteText" size="large">
          {description}
        </TextParagraph>
      </BackgroundCanvas>
      <TextBold>History</TextBold>
      <TextParagraph className={styles.smallerSpacing}>
        {arrayChanges.length} updates
      </TextParagraph>
      <Pagination
        totalCards={totalCards}
        cardsPerPage={cardsPerPage}
        setCurrentPage={setCurrentPage}
      />
      {currentCards.map((change) => (
        <StatusCard
          key={change.id}
          issueStatus={change.status}
          issueMessage={change.message}
          issueDate={change.createdAt}
        />
      ))}
    </BackgroundCanvas>
  );
}
