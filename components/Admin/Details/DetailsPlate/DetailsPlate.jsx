import React, { useState } from "react";
import styles from "./DetailsPlate.module.css";
import BackgroundCanvas from "../../Shared/BackgroundCanvas/BackgroundCanvas";
import TextParagraph from "../../Shared/Typography/TextParagraph";
import TextBold from "../../Shared/Typography/TextBold";
import { dateFormat } from "@/utils/serialize";
import IssueCard from "../../List/IssueCard/IssueCard";
import StatusCard from "../StatusCard/StatusCard";
import { Pagination } from "@/utils/serialize";

export default function DetailsPlate({
  id,
  createdAt,
  userName,
  location,
  description,
  arrayChanges,
}) {
  //console.log("ARRAY CHANGES ->", arrayChanges);
  const [historyData, setHistoryData] = useState([]);
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
    currentPage
  );

  // const pagination = () => {
  //   let pages = [];

  //   for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
  //     return (
  //       <div>
  //         {pages.map((page, index) => {
  //           return <button key={index}>{page}</button>;
  //         })}
  //       </div>
  //     );
  //   }
  // };

  return (
    <BackgroundCanvas className={styles.detailsMain}>
      <Pagination
        totalCards={totalCards}
        cardsPerPage={cardsPerPage}
        setCurrentPage={setCurrentPage}
      />
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
      <TextBold>History</TextBold>
      <TextParagraph className={styles.smallerSpacing}>
        {arrayChanges.length} updates
      </TextParagraph>
      {arrayChanges.map((change) => (
        <StatusCard
          key={change.id}
          issueStatus={change.status}
          issueMessage={change.message}
          isHistory={true}
        />
      ))}
      <BackgroundCanvas variant="lighterCanvas" className={styles.description}>
        <TextParagraph variant="whiteText" size="large">
          {description}
        </TextParagraph>
      </BackgroundCanvas>
    </BackgroundCanvas>
  );
}
