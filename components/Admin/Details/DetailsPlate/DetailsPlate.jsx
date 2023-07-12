import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { dateFormat, Pagination } from "@/utils/serialize";
import StatusCard from "../../Details/StatusCard";
import arrowDown from "../../../../pages/assets/images/icon-arrow-down.svg";

const UserLocation = dynamic(
  () => import("@/components/User/IssueForm/UserLoaction/UserLocation"),
  {
    ssr: false,
  }
);

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
  arrayChanges,
  images,
  latitude,
  longitude,
}) {
  const [openHistory, setOpenHistory] = useState(false);

  const arrayHistory = arrayChanges.filter(
    (change) => change !== arrayChanges[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = arrayHistory.slice(firstCardIndex, lastCardIndex);
  const totalCards = arrayChanges.length;

  return (
    <BackgroundCanvas className={styles.detailsMain}>
      <div className={styles.top}>
        <div className={styles.id}>
          <div className={`${styles.idInner} ${styles.idSpacing}`}>
            <TextBold variant="hash">#</TextBold>
            <TextBold variant={styles.idLargeScreen}>id</TextBold>
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
      <div className={styles.location}>
        <BackgroundCanvas variant="lighterCanvas">
          {latitude ? (
            <UserLocation
              locationType="current"
              admin="admin"
              latitude={latitude}
              longitude={longitude}
            />
          ) : undefined}
        </BackgroundCanvas>
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
      <BackgroundCanvas
        variant="lighterCanvas"
        className={styles.imagesContainer}
      >
        {images.length === 0 ? (
          <TextParagraph variant="whiteText" size="large">
            No image was posted by the user
          </TextParagraph>
        ) : (
          images.map((image, index) => (
            <img
              className={styles.image}
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
            {arrayChanges.length}{" "}
            {arrayChanges.length === 1 ? "update" : "updates"}
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
      <div
        className={
          openHistory === false || arrayChanges.length === 1
            ? styles.hideHistory
            : ""
        }
      >
        <div className={styles.pagination}>
          <BackgroundCanvas
            variant="lighterCanvas"
            className={styles.paginationInner}
          >
            <Pagination
              totalCards={totalCards}
              cardsPerPage={cardsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </BackgroundCanvas>
        </div>
        {currentCards.map((change) => (
          <StatusCard
            key={change.id}
            issueStatus={change.status}
            issueMessage={change.message}
            issueDate={change.createdAt}
          />
        ))}
      </div>
    </BackgroundCanvas>
  );
}
