import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "./StepOneForm.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { ubuntu } from "@/styles/fonts";

import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import ConfirmationMessage from "../ConfirmationMessage";
import { postIssue } from "@/services";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import IssueContext from "@/utils/IssueContext";
import StepIndicator from "../../Shared/StepIndicator/StepIndicator";

const formSchema = z.object({
  userName: z
    .string()
    .min(2, "user name must be at least 2 characters long")
    .max(255, "the provided user name contains too much characters"),
  description: z
    .string()
    .min(10, "description must be at least 10 characters long")
    .max(255, "the provided description contains too much characters"),
  email: z
    .string()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Please provide a valid email address or leave it empty",
      }
    ),
});

export default function StepOneForm() {
  const { stepOneFormData, setStepOneFormData, setSelectedStepForm } =
    useContext(IssueContext);
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      description: "",
    },
    // mode: "all", --> don't use, it's users unfriendly
    resolver: zodResolver(formSchema),
  });

  //remember to add or remove "async/await" statements if necessary later
  const issueRequest = async (data) => {
    console.log("data?", data);
    try {
      setLoading(true);
      const [error, _response] = await setStepOneFormData({
        userName: data.userName,
        email: data.email,
        description: data.description,
      });
      setSelectedStepForm("location");

      if (error) {
        console.log("Failed to submit data");
        setErrorPosting(true);
        return;
      }
      reset();
      setSuccessRequest(true);
      setLoading(false);
    } catch (error) {
      // Handle error
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
      setErrorPosting(true);
      setLoading(false);
      setSelectedStepForm("LOCATION");
    }
  };
  console.log("context updated?", stepOneFormData);
  return (
    <div>
      <div className={`${styles.main} ${ubuntu.className}`}>
        <div className={styles.image}>
          <div className={styles.stepIndicators}>
            <div className={styles.indicators}></div>
          </div>
        </div>{" "}
        <div className={styles.form}>
          {successRequest === false ? (
            <form onSubmit={handleSubmit(issueRequest)}>
              <FormContent
                userRegister={{ ...register("userName") }}
                descriptionRegister={{ ...register("description") }}
                emailRegister={{ ...register("email") }}
                errors={errors}
              />
              {errorPosting && (
                <p className={styles.errorMessage}>
                  An error occured when posting the issue. Please try again or
                  contact admin.
                </p>
              )}
              <Footer className={styles.footer}>
                {"Next"}
                {loading ? <LoaderSpinner variant="submitBtn" /> : undefined}
              </Footer>
            </form>
          ) : (
            <ConfirmationMessage
              title="Thanks for submiting your issue!"
              subtitle="Your report will make our city more awesome."
              onClick={returnFormPage}
            >
              Thanks for submitting your issue!
            </ConfirmationMessage>
          )}
        </div>
      </div>
    </div>
  );
}
