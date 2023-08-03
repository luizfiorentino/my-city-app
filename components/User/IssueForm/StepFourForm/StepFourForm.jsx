import React from "react";
import styles from "./StepFourForm.module.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import BackgroundCanvas from "@/components/Admin/Shared/BackgroundCanvas/BackgroundCanvas";
import TextBold from "@/components/Admin/Shared/Typography/TextBold/TextBold";
import dynamic from "next/dynamic";
import Footer from "../../Shared/Footer/Footer";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import { useContext } from "react";
import IssueContext from "@/utils/IssueContext";
console.log("new commit");

const UserLocation = dynamic(
  () => import("@/components/User/IssueForm/UserLocation/UserLocation"),
  {
    ssr: false,
  }
);

export default function StepFourForm({ issueRequest }) {
  const {
    stepOneFormData,
    issueAddress,
    latitude,
    longitude,
    loading,
    previewSources,
    setUploadedPictures,
    setSelectedStepForm,
    setButtonInactive,
  } = useContext(IssueContext);

  const backStepThree = () => {
    // setUploadedPictures([]);
    setSelectedStepForm("PICTURES");
    setButtonInactive(false);
  };
  return (
    <>
      <ConfirmationMessage
        title="Finishing up"
        subtitle="Please check if the information provided is correct before confirm."
        footer="Confirm"
        onClick={issueRequest}
        loading={loading}
        variant="largeFont"
      ></ConfirmationMessage>
      <ConfirmationMessage>
        <div>
          <BackgroundCanvas variant="lightGrey">
            <div className={styles.summaryContainer}>
              <div className={styles.summaryField}>
                <TextBold variant="darkSummary">Name</TextBold>
                <TextBold variant="lightSummary">
                  {stepOneFormData.userName}
                </TextBold>
              </div>
              <div className={styles.summaryField}>
                <TextBold variant="darkSummary">Email</TextBold>
                <TextBold variant="lightSummary">
                  {stepOneFormData.email
                    ? stepOneFormData.email
                    : "not informed"}
                </TextBold>
              </div>
              <div className={styles.summaryFieldDescription}>
                <TextBold variant="darkSummary">Description</TextBold>
                <TextBold variant="lightSummaryDescription">
                  {stepOneFormData.description}
                </TextBold>
              </div>
              <div className={styles.summaryFieldLocation}>
                <TextBold variant="darkSummary">Location</TextBold>
                <TextBold variant="lightSummaryDescription">
                  {`${issueAddress}.`}
                </TextBold>
              </div>
              <div className={styles.summaryFieldDescription}>
                {latitude && (
                  <UserLocation latitude={latitude} longitude={longitude} />
                )}
              </div>
              <div className={styles.uploadImageBanner}>
                <TextBold variant="darkSummary">Uploaded Images</TextBold>
              </div>
              {previewSources.length ? (
                <div className={styles.uploadImage}>
                  <div className={styles.imageArea}>
                    {previewSources &&
                      previewSources.map((src, index) => (
                        <div
                          key={index}
                          className={styles.imagePreviewContainer}
                        >
                          <img
                            className={styles.imagePreview}
                            src={src}
                            alt="chosen"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <TextBold variant="lightSummaryDescription">
                  No image uploaded.
                </TextBold>
              )}
            </div>
          </BackgroundCanvas>
        </div>
      </ConfirmationMessage>
      <Footer
        onClick={issueRequest}
        loading={loading}
        variant="submitInfos"
        backButton={true}
        onClick2={backStepThree}
      >
        Confirm {loading && <LoaderSpinner className={styles.spinner} />}
      </Footer>
    </>
  );
}
