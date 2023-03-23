import React from "react";
import styles from "./FormContent.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormSubtitle from "../FormSubtitle/FormSubtitle";
import FormInput from "../FormInput/FormInput";
import Footer from "../Footer/Footer";
export default function FormContent() {
  return (
    <div className={styles.main}>
      <div className={styles.mainInner}>
        <div className={styles.header}>
          <FormHeader />
          <FormSubtitle />
        </div>
        <div className={styles.inputFields}>
          <FormInput label="Name" placeHolder="e.g. Mike Ness" />
          <FormInput
            label="Description"
            placeHolder="e.g. there is something..."
          />
          <FormInput
            label="Location"
            placeHolder="e.g. Dijkstraat 123. Amsterdam"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
