import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import AdminTopBar from "@/components/Admin/Nav/AdminTopBar";
import styles from "./IssueStatus.module.css";
import arrowLeft from "../../../pages/assets/images/icon-arrow-left.svg";
import EditBar from "@/components/Admin/Details/EditBar";
import DetailsPlate from "@/components/Admin/Details/DetailsPlate";
import TextBold from "@/components/Admin/Shared/Typography/TextBold";
import IssueContext from "@/utils/IssueContext";
import {
  sendDeleteRequest,
  sendEmail,
  sendSolvedUpdateRequest,
  sendUpdateIssueRequest,
} from "@/services";

export default function IssueStatus({ issue }) {
  const router = useRouter();
  const context = useContext(IssueContext);
  const [issueDetails, setIssueDetails] = useState(issue);

  const updateStatus = async (message, status, buttonMode) => {
    try {
      context.setLoading(true);
      switch (buttonMode) {
        case "edit": {
          const newStatus = await sendUpdateIssueRequest(
            status,
            message,
            issue.id,
            issue.email
          );
          addStatus(newStatus);

          break;
        }
        case "solved": {
          const newStatus = await sendSolvedUpdateRequest(issue.id);
          addStatus(newStatus);

          break;
        }
        case "delete": {
          await sendDeleteRequest(issue.id);
          router.push("/admin");
          break;
        }
      }
      context.setLoading(false);
      context.setOpenModal(false);
    } catch (e) {
      console.log(e.message);
      context.setLoading(false);
    }
  };

  function addStatus(newStatus) {
    setIssueDetails({
      ...issue,
      statusChange: [...issue.statusChange, newStatus],
    });
  }

  return (
    <div className={styles.container}>
      <AdminTopBar />
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
        <EditBar
          arrayChanges={issueDetails?.statusChange}
          updateStatus={updateStatus}
          footer={false}
        />
        <DetailsPlate
          id={issueDetails?.id}
          createdAt={issueDetails?.createdAt}
          userName={issueDetails?.userName}
          location={issueDetails?.location}
          description={issueDetails?.description}
          arrayChanges={issueDetails?.statusChange}
          images={issueDetails?.images}
          locationType="current"
          admin="admin"
          latitude={issueDetails.latitude}
          longitude={issueDetails.longitude}
        />

        <EditBar
          arrayChanges={issueDetails?.statusChange}
          updateStatus={updateStatus}
          footer={true}
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
      include: {
        statusChange: true,
        images: true,
      },
    });

    return {
      props: {
        issue: serialize(issue),
      },
    };
  } catch (e) {
    console.log("db error:", e);
  }
}
