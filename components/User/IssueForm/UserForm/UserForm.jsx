import React, { useContext, useState } from "react";
import { ubuntu } from "@/styles/fonts";
import styles from "./UserForm.module.css";
import ConfirmationMessage from "../ConfirmationMessage";
import { postIssue } from "@/services";
import IssueContext from "@/utils/IssueContext";
import StepIndicator from "../../Shared/StepIndicator/StepIndicator";
import StepOneForm from "../StepOneForm/StepOneForm";
import StepTwoForm from "../StepTwoForm/StepTwoForm";
import StepThreeForm from "../StepThreeForm/StepThreeForm";
import FormHeader from "../../Shared/Fields/FormHeader/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import Footer from "../../Shared/Footer/Footer";
import StepFourForm from "../StepFourForm/StepFourForm";

const formSteps = ["INFOS", "LOCATION", "PICTURES", "CONFIRM DATA"];

export default function UserForm() {
  const context = useContext(IssueContext);
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  const issueRequest = async () => {
    const { stepOneFormData, location } = context;

    try {
      context.setLoading(true);
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
        context.setStepOneFormData({
          userName: "",
          email: "",
          description: "",
        });
        context.setIssueAddress("Amsterdam");
        context.setUploadedPictures([]);
        context.setPreviewSources([]);
        context.setLatitude(null);
        context.setLongitude(null);
        context.setLoading(false);
        setErrorSubmitting(true);
        context.setSelectedStepForm("SUBMITTED");

        return;
      }
      context.setStepOneFormData({
        userName: "",
        email: "",
        description: "",
      });
      context.setIssueAddress("Amsterdam");
      context.setUploadedPictures([]);
      context.setPreviewSources([]);
      context.setLatitude(null);
      context.setLongitude(null);
      context.setButtonInactive(false);
      context.setLoading(false);
      context.setSelectedStepForm("SUBMITTED");
    } catch (error) {
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
    }
  };

  const backToForm = () => {
    setErrorSubmitting(false);
    context.setSelectedStepForm("INFOS");
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}>
        <div className={styles.stepIndicators}>
          <div className={styles.indicators}>
            {formSteps.map((step, i) => (
              <StepIndicator
                key={i}
                number={i + 1}
                description={step}
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
          <StepFourForm issueRequest={issueRequest} />
        )}

        {context.selectedStepForm === "SUBMITTED" && (
          <div className={styles.confirmationMessage}>
            <ConfirmationMessage>
              <FormHeader>
                {errorSubmitting ? "Error" : "Issue Submitted"}
              </FormHeader>
              <FormSubtitle>
                {errorSubmitting
                  ? "Something went wrong. Please try later or contact the admin."
                  : "Thanks for helping the City get awesome!"}
              </FormSubtitle>
            </ConfirmationMessage>

            <Footer goForward={backToForm}>
              {errorSubmitting ? "Back" : "New"}
            </Footer>
          </div>
        )}
      </div>
    </div>
  );
}
