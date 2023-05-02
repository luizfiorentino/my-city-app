import React, { useState } from "react";
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
import StatusModal from "../../../components/Admin/Details/StatusModal";
import axios from "axios";

export default function IssueStatus({ issue }) {
  //console.log("issue det page top", issue, "array");
  const dayjs = require("dayjs");

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [issueDetails, setIssueDetails] = useState(issue);
  const [loading, setLoading] = useState(false);

  const changesOrderedByDate = issueDetails.statusChange.sort((a, b) => {
    return dayjs(b.createdAt) - dayjs(a.createdAt);
  });

  const [status, setStatus] = useState(changesOrderedByDate[0]["status"]);
  //console.log("openModal", openModal);

  function close(e) {
    if (e.target.id === "overlay") {
      setOpenModal(false);
    }
  }

  const updateStatus = async (message) => {
    try {
      const newStatus = await axios.post(`../../api/statusChanges`, {
        statusChange: {
          status: status,
          message: message,
          issueId: issueDetails.statusChange[0]["issueId"],
        },
      });

      //console.log("NEW STATUS", newStatus);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log("status", status, "message", message),
    "issueId",
    issue.statusChange[0]["issueId"];

  const submit = () => {
    updateStatus(message);
    setOpenModal(false);
    // setMessage("");
  };

  const buttonOptions = [
    "Submitted",
    "On progress",
    "Information needed",
    "Done",
  ];

  function addStatus(newStatus) {
    console.log("addStatus function", newStatus, issue);
    setIssueDetails({
      ...issue,
      statusChange: [...issue.statusChange, newStatus],
    });
  }

  console.log("DETAILS PAGE", loading);

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
          arrayChanges={issueDetails.statusChange}
          addStatus={addStatus}
          loading={loading}
          setLoading={setLoading}
        />
        <DetailsPlate
          id={issueDetails.id}
          createdAt={issueDetails.createdAt}
          userName={issueDetails.userName}
          location={issueDetails.location}
          description={issueDetails.description}
          arrayChanges={issueDetails.statusChange}
        />
      </div>
      {/* <div
        id="overlay"
        className={`${openModal === true ? styles.overlay : undefined}`}
        onClick={openModal ? close : null}
      > */}
      {/* <StatusModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          updateStatus={updateStatus}
          message={message}
          setMessage={setMessage}
          submit={submit}
          buttonOptions={buttonOptions}
          setStatus={setStatus}
          loading={loading}
          hello={"world"}
        /> */}
      {/* </div> */}
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
