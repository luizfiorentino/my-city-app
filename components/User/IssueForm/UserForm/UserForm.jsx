import React, { useState, useContext } from "react";
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
  const [loading, setLoading] = useState(false);
  console.log("userform context", context);

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
        context.stepOneFormData({
          userName: "",
          email: "",
          description: "",
        });
        context.issueAddress("Amsterdam");
        context.uploadedPictures([]);
        context.previewSources([]);
        context.latitude(null);
        context.longitude(null);

        return;
      }
      context.stepOneFormData({
        userName: "",
        email: "",
        description: "",
      });
      context.issueAddress("Amsterdam");
      context.uploadedPictures([]);
      context.previewSources([]);
      context.latitude(null);
      context.longitude(null);

      setLoading(false);
      context.setSelectedStepForm("SUBMITTED");
    } catch (error) {
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
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
          <StepFourForm issueRequest={issueRequest} loading={loading} />
        )}

        {context.selectedStepForm === "SUBMITTED" && (
          <>
            <ConfirmationMessage>
              <FormHeader>Issue Submitted</FormHeader>
              <FormSubtitle>
                Thanks for helping the City get awesome!
              </FormSubtitle>
            </ConfirmationMessage>{" "}
            <Footer onClick={backToForm}>New</Footer>
          </>
        )}
      </div>
    </div>
  );
}
