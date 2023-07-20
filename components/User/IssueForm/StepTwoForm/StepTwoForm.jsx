import React, { useState, useContext } from "react";
import styles from "./StepTwoForm.module.css";
import { ubuntu } from "@/styles/fonts";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import IssueContext from "@/utils/IssueContext";

export default function StepTwoForm() {
  const context = useContext(IssueContext);

  const [loading, setLoading] = useState(false);

  // eventually remove "async await" statements
  const submitCoordinates = async () => {
    try {
      setLoading(true);
      await context.setLatitude(parseFloat(context.latitude));
      await context.setLongitude(parseFloat(context.longitude));

      setLoading(false);

      await context.setSelectedStepForm("PICTURES");
    } catch (error) {
      console.log("An error occurred while submitting location", error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}></div>{" "}
      <div className={styles.form}>
        <FormContent />
        <div onClick={() => submitCoordinates()}>
          <Footer className={styles.footer}>
            {"Next"}
            {loading ? <LoaderSpinner variant="submitBtn" /> : undefined}
          </Footer>
        </div>
      </div>
    </div>
  );
}
