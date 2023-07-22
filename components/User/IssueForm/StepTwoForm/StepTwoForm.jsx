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
  } = useContext(IssueContext);

  useEffect(() => {
    setButtonInactive(true);
  }, []);

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

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}></div>{" "}
      <div className={styles.form}>
        <FormContent />
        <div onClick={() => submitCoordinates()}>
          <Footer className={styles.footer}>{"Next"}</Footer>
        </div>
      </div>
    </div>
  );
}
