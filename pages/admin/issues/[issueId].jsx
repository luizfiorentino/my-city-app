import React from "react";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import AdminTopBar from "@/components/adminTopBar/AdminTopBar";
import styles from "./IssueStatus.module.css";
import arrowLeft from "../../../pages/assets/images/icon-arrow-left.svg";
import IssueCard from "@/components/issueCard/IssueCard";
import StatusCard from "@/components/statusCard/StatusCard";
import DetailsPlate from "@/components/detailsPlate/DetailsPlate";

export default function IssueStatus({ issue }) {
  console.log("issue det page top", issue);

  return (
    <div className={styles.detailsPageMain}>
      <AdminTopBar />
      <p className={styles.backLink}>
        <span className={styles.arrow}>
          <img src={arrowLeft.src} alt="arrow sign pointed to the left" />
        </span>
        Go back
      </p>
      <StatusCard />
      <DetailsPlate
        id={issue.id}
        createdAt={issue.createdAt}
        userName={issue.userName}
        location={issue.location}
        description={issue.description}
      />
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

    return { props: { issue: serialize(issue) } };
  } catch (e) {
    console.log("db error:", e);
  }
}
