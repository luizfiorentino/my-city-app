import React, { useContext, useState } from "react";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { dateFormat } from "@/utils/serialize";

import { Pagination } from "@/utils/serialize";
import StatusCard from "../../Details/StatusCard";
import arrowDown from "../../../../pages/assets/images/icon-arrow-down.svg";
import IssueContext from "@/utils/IssueContext";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
  arrayChanges,
  images,
}) {
  const context = useContext(IssueContext);
  //console.log("context", context);
  // const [openModal, setOpenModal] = useState(false);
  // const [message, setMessage] = useState("");
  const [openHistory, setOpenHistory] = useState(false);

  function close(e) {
    if (e.target.id === "overlay") {
      context.setOpenModal(false);
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

        <div className={styles.sub}>
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
        <div className={styles.sub}>
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

      <TextParagraph className={styles.smallerSpacing}>
        Related Image(s)
      </TextParagraph>
      <BackgroundCanvas variant="lighterCanvas" className={styles.description}>
        {images.length === 0 ? (
          <TextParagraph variant="whiteText" size="large">
            No image was posted by the user
          </TextParagraph>
        ) : (
          images.map((image, index) => (
            <img
              style={{ height: "300px" }}
              key={index}
              src={image.url}
              alt="user's posted image"
            />
          ))
        )}
      </BackgroundCanvas>

      <div
        className={styles.historyOuter}
        onClick={() => setOpenHistory(!openHistory)}
      >
        <div className={styles.historyAndUpdates}>
          <TextBold>History</TextBold>
          <TextParagraph className={styles.smallerSpacing}>
            {arrayChanges.length} updates
          </TextParagraph>
        </div>

        {openHistory === false ? (
          <img
            src={arrowDown.src}
            className={styles.arrowDown}
            alt="arrow down"
          />
        ) : (
          <img
            src={arrowDown.src}
            className={`${styles.arrowDown} ${styles.arrowUp}`}
            alt="arrow up"
          />
        )}
      </div>
      <div className={openHistory === false && styles.hideHistory}>
        <div className={styles.pagination}>
          {" "}
          <BackgroundCanvas
            variant="lighterCanvas"
            className={styles.paginationInner}
          >
            <Pagination
              totalCards={totalCards}
              cardsPerPage={cardsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />{" "}
          </BackgroundCanvas>
        </div>
        {currentCards.map((change) => (
          <StatusCard
            key={change.id}
            issueStatus={change.status}
            issueMessage={change.message}
            issueDate={change.createdAt}
          />
        ))}{" "}
      </div>
    </BackgroundCanvas>
  );
}
