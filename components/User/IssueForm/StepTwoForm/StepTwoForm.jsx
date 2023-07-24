import React, { useState, useContext, useEffect } from "react";
import styles from "./StepTwoForm.module.css";
import { ubuntu } from "@/styles/fonts";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import IssueContext from "@/utils/IssueContext";
import { Context } from "maplibre-gl";

export default function StepTwoForm() {
  //const context = useContext(IssueContext);

  const {
    setLoading,
    setButtonInactive,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    setSelectedStepForm,
    stepOneFormData,
    setStepOneFormData,
  } = useContext(IssueContext);

  useEffect(() => {
    setButtonInactive(true);
  }, []);
  console.log("setp2", stepOneFormData);
  // eventually remove "async await" statements
  const submitCoordinates = async () => {
    setLoading(true);
    try {
      await setLatitude(parseFloat(latitude));
      await setLongitude(parseFloat(longitude));

      setSelectedStepForm("PICTURES");
      setLoading(false);
    } catch (error) {
      console.log("An error occurred while submitting location", error.message);
      setLoading(false);
    }
  };

  const backStepOne = () => {
    setStepOneFormData({
      userName: "",
      email: "",
      description: "",
    });

    setSelectedStepForm("INFOS");
    setButtonInactive(false);
    console.log("kwak");
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}></div>{" "}
      <div className={styles.form}>
        <FormContent />
        <div>
          <Footer
            className={styles.footer}
            onClick={() => submitCoordinates()}
            onClick2={backStepOne}
            backButton={true}
          >
            {"Next"}
          </Footer>
        </div>
      </div>
    </div>
  );
}
