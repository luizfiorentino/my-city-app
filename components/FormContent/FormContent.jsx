import React, { useState } from "react";
import styles from "./FormContent.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormSubtitle from "../FormSubtitle/FormSubtitle";
import FormInput from "../FormInput/FormInput";
import Footer from "../Footer/Footer";

import axios from "axios";

export default function FormContent() {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const issueRequest = async () => {
    try {
      const newIssue = await axios.post(`./api/issues`, {
        issue: {
          userName: userName,
          description: description,
          location: location,
        },
      });
      setUserName("");
      setDescription("");
      setLocation("");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.externalContainer}>
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.header}>
            <FormHeader />
            <FormSubtitle />
          </div>
          <div className={styles.inputFields}>
            <FormInput
              label="Name"
              placeHolder="e.g. Mike Ness"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormInput
              label="Description"
              placeHolder="e.g. there is something..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormInput
              label="Location"
              placeHolder="e.g. Dijkstraat 123. Amsterdam"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.space}></div>
      </div>{" "}
      <Footer onClick={issueRequest} />
    </div>
  );
}
