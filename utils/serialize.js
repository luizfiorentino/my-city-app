import styles from "./serialize.module.css";
import { leagueSpartan } from "@/styles/fonts";

export default function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}

export function dateFormat(createdAt) {
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
  return `${createdAt.substring(8, 10)}${prefix} ${month} ${createdAt.substring(
    0,
    4
  )}`;
}

export function Pagination({
  totalCards,
  cardsPerPage,
  currentPage,
  setCurrentPage,
}) {
  let pages = [];

  const totalCardsInHistory = totalCards - 1;

  for (let i = 1; i <= Math.ceil(totalCardsInHistory / cardsPerPage); i++) {
    pages.push(i);
  }
  const clicked = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.button}>
      {pages.map((page, index) => {
        return (
          <button
            className={`${
              currentPage === page ? styles.buttonActive : styles.buttonInner
            } ${leagueSpartan.className}`}
            key={index}
            // onClick={() => setCurrentPage(page)}
            onClick={() => clicked(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
