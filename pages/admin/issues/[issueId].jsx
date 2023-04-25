import React from "react";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import AdminTopBar from "@/components/Admin/Nav/AdminTopBar";
import styles from "./IssueStatus.module.css";
import arrowLeft from "../../../pages/assets/images/icon-arrow-left.svg";
import EditBar from "@/components/Admin/Details/EditBar";
import DetailsPlate from "@/components/Admin/Details/DetailsPlate";
import Link from "next/link";
import TextBold from "@/components/Admin/Shared/Typography/TextBold";
import BackgroundCanvas from "@/components/Admin/Shared/BackgroundCanvas/BackgroundCanvas";

export default function IssueStatus({ issue }) {
  console.log("issue det page top", issue, "array");

  return (
    <div className={styles.container}>
      <AdminTopBar className={styles.tb} />
      <div className={styles.detailsPageMain}>
        <Link
          href={`/admin/`}
          style={{ display: "flex" }}
          className={styles.link}
        >
          <span className={styles.arrow}>
            <img src={arrowLeft.src} alt="arrow sign pointed to the left" />
          </span>
          <TextBold className={styles.backLink}>Go back</TextBold>
        </Link>
        <EditBar arrayChanges={issue.statusChange} isHistory={false} />
        <DetailsPlate
          id={issue.id}
          createdAt={issue.createdAt}
          userName={issue.userName}
          location={issue.location}
          description={issue.description}
          arrayChanges={issue.statusChange}
        />
      </div>
      <BackgroundCanvas className={styles.footer}>
        <div className={styles.buttonsPannel}>
          <button
            onClick={() => setOpenModal(true)}
            className={styles.buttonEdit}
          >
            <TextBold size="large" className={styles.editButton}>
              Edit
            </TextBold>
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className={styles.buttonEdit}
          >
            <TextBold
              size="large"
              className={`${styles.editButton} ${styles.deleteButton}`}
            >
              Delete
            </TextBold>
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className={styles.buttonEdit}
          >
            <TextBold
              size="large"
              className={`${styles.editButton} ${styles.solvedButton}`}
            >
              Mark as solved
            </TextBold>
          </button>
        </div>
      </BackgroundCanvas>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: context.params.issueId,
      },
      include: {
        statusChange: true,
      },
    });

    // no longer necessary due to the "include" above
    // const statusChanges = await prisma.statusChange.findMany({
    //   where: {
    //     issueId: context.params.issueId,
    //   },
    // });
    // const arrayChanges = statusChanges.map((change) => serialize(change));
    // don't need to serialize so, we can do it with the whole array
    // props: (...) arrayChanges: serialize(statusChanges)

    return {
      props: {
        issue: serialize(issue),
        // arrayChanges: arrayChanges,
      },
    };
  } catch (e) {
    console.log("db error:", e);
  }
}
