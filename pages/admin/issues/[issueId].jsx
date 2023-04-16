import React from "react";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import AdminTopBar from "@/components/Admin/Nav/AdminTopBar";
import styles from "./IssueStatus.module.css";
import arrowLeft from "../../../pages/assets/images/icon-arrow-left.svg";
import StatusCard from "@/components/Admin/Details/StatusCard";
import DetailsPlate from "@/components/Admin/Details/DetailsPlate";
import Link from "next/link";
import TextBold from "@/components/Admin/Shared/Typography/TextBold";

export default function IssueStatus({ issue, arrayChanges }) {
  console.log("issue det page top", issue, "array", arrayChanges);

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
        <StatusCard arrayChanges={arrayChanges} />
        <DetailsPlate
          id={issue.id}
          createdAt={issue.createdAt}
          userName={issue.userName}
          location={issue.location}
          description={issue.description}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: context.params.issueId,
      },
    });
    const statusChanges = await prisma.statusChange.findMany({
      where: {
        issueId: context.params.issueId,
      },
    });
    const arrayChanges = statusChanges.map((change) => serialize(change));

    return {
      props: {
        issue: serialize(issue),
        arrayChanges: arrayChanges,
      },
    };
  } catch (e) {
    console.log("db error:", e);
  }
}
