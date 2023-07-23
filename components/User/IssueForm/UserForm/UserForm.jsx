import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import { ubuntu } from "@/styles/fonts";
import styles from "./UserForm.module.css";
import ConfirmationMessage from "../ConfirmationMessage";
import { postIssue } from "@/services";
import IssueContext from "@/utils/IssueContext";
import StepIndicator from "../../Shared/StepIndicator/StepIndicator";
import StepOneForm from "../StepOneForm/StepOneForm";
import StepTwoForm from "../StepTwoForm/StepTwoForm";
import StepThreeForm from "../StepThreeForm/StepThreeForm";
import BackgroundCanvas from "@/components/Admin/Shared/BackgroundCanvas/BackgroundCanvas";
import TextBold from "@/components/Admin/Shared/Typography/TextBold/TextBold";
import FormHeader from "../../Shared/Fields/FormHeader/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import Footer from "../../Shared/Footer/Footer";

const UserLocation = dynamic(
  () => import("@/components/User/IssueForm/UserLocation/UserLocation"),
  {
    ssr: false,
  }
);

const formSteps = ["INFOS", "LOCATION", "PICTURES", "CONFIRM DATA"];

export default function UserForm() {
  const context = useContext(IssueContext);

  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  const issueRequest = async () => {
    const { stepOneFormData, location } = context;

    try {
      setLoading(true);
      const [error, _response] = await postIssue({
        userName: stepOneFormData.userName,
        description: stepOneFormData.description,
        location,
        email: stepOneFormData.email,
        latitude: parseFloat(context.latitude),
        longitude: parseFloat(context.longitude),
        location: context.issueAddress,
        file: context.uploadedPictures,
      });
      if (error) {
        console.log("Failed to submit data");
        setErrorPosting(true);
        return;
      }

      setSuccessRequest(true);
      setPreviewSources([]);
      setLoading(false);
      context.setSelectedStepForm("SUBMITTED");
    } catch (error) {
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
      setErrorPosting(true);
      setPreviewSources([]);
    }
  };

  const backToForm = () => {
    context.setSelectedStepForm("INFOS");
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}>
        <div className={styles.stepIndicators}>
          <div className={styles.indicators}>
            {formSteps.map((step, i) => (
              <StepIndicator
                number={i + 1}
                description={step}
                onClick={() => setSelectedIndex(i)}
                selected={context.selectedStepForm === step ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.form}>
        {context.selectedStepForm === "INFOS" && <StepOneForm />}
        {context.selectedStepForm === "LOCATION" && <StepTwoForm />}
        {context.selectedStepForm === "PICTURES" && <StepThreeForm />}
        {context.selectedStepForm === "CONFIRM DATA" && (
          <>
            <ConfirmationMessage
              title="Finishing up"
              subtitle="Please check if the information provided is correct before confirm."
              footer="Confirm"
              onClick={issueRequest}
              loading={loading}
              variant="largeFont"
            >
              <div className={styles.externalCanvasSummary}>
                <BackgroundCanvas variant="lightGrey">
                  <div className={styles.summaryContainer}>
                    <div className={styles.summaryField}>
                      <TextBold variant="darkSummary">Name</TextBold>
                      <TextBold variant="lightSummary">
                        {context.stepOneFormData.userName}
                      </TextBold>
                    </div>
                    <div className={styles.summaryField}>
                      <TextBold variant="darkSummary">Email</TextBold>
                      <TextBold variant="lightSummary">
                        {context.stepOneFormData.email
                          ? context.stepOneFormData.email
                          : "not informed"}
                      </TextBold>
                    </div>
                    <div className={styles.summaryFieldDescription}>
                      <TextBold variant="darkSummary">Description</TextBold>
                      <TextBold variant="lightSummaryDescription">
                        {context.stepOneFormData.description}
                      </TextBold>
                    </div>{" "}
                    <div className={styles.summaryFieldLocation}>
                      <TextBold variant="darkSummary">Location</TextBold>
                      <TextBold variant="lightSummaryDescription">
                        {`${context.issueAddress}.`}
                      </TextBold>
                    </div>
                    <div className={styles.summaryFieldDescription}>
                      {context.latitude && (
                        <UserLocation
                          latitude={context.latitude}
                          longitude={context.longitude}
                        />
                      )}
                    </div>
                    <div className={styles.uploadImageBanner}>
                      <TextBold variant="darkSummary">Uploaded Images</TextBold>
                    </div>
                    {context.previewSources.length ? (
                      <div className={styles.uploadImage}>
                        <div className={styles.imageArea}>
                          {context.previewSources &&
                            context.previewSources.map((src, index) => (
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
          </>
        )}
        {context.selectedStepForm === "SUBMITTED" && (
          <>
            <FormHeader>Issue Submitted</FormHeader>
            <FormSubtitle>
              Thanks for helping the City get awesome!
            </FormSubtitle>
            <Footer onClick={backToForm}>New</Footer>
          </>
        )}
      </div>
    </div>
  );
}
