import React, { useState, useContext } from "react";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import AdminTopBar from "@/components/Admin/Nav/AdminTopBar";
import styles from "./IssueStatus.module.css";
import arrowLeft from "../../../pages/assets/images/icon-arrow-left.svg";
import EditBar from "@/components/Admin/Details/EditBar";
import DetailsPlate from "@/components/Admin/Details/DetailsPlate";
import Link from "next/link";
import TextBold from "@/components/Admin/Shared/Typography/TextBold";
import { useRouter } from "next/router";
import IssueContext from "@/utils/IssueContext";
import {
  sendDeleteRequest,
  sendSolvedUpdateRequest,
  sendUpdateIssueRequest,
} from "@/services";
import dynamic from "next/dynamic";

const UserLocation = dynamic(
  () => import("@/components/User/IssueForm/UserLoaction/UserLocation"),
  {
    ssr: false,
  }
);

export default function IssueStatus({ issue }) {
  const router = useRouter();

  const [issueDetails, setIssueDetails] = useState(issue);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (message, status, buttonMode) => {
    try {
      context.setLoading(true);

      switch (buttonMode) {
        case "edit": {
          const newStatus = await sendUpdateIssueRequest(
            status,
            message,
            issue.id
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

  const context = useContext(IssueContext);

  function close(e) {
    if (e.target.id === "overlay") {
      context.setOpenModal(false);
    }
  }

  function addStatus(newStatus) {
    setIssueDetails({
      ...issue,
      statusChange: [...issue.statusChange, newStatus],
    });
  }

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
        <EditBar
          footer={false}
          updateStatus={updateStatus}
          arrayChanges={issueDetails?.statusChange}
          addStatus={addStatus}
          loading={loading}
          setLoading={setLoading}
          issueId={issue?.id}
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
          className={styles.footerBar}
          footer={true}
          updateStatus={updateStatus}
          arrayChanges={issueDetails?.statusChange}
          addStatus={addStatus}
          loading={loading}
          setLoading={setLoading}
          issueId={issue?.id}
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
    console.log("issue details", issue);

    return {
      props: {
        issue: serialize(issue),
      },
    };
  } catch (e) {
    console.log("db error:", e);
  }
}
