import React, { useState } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";
import image from "../../pages/assets/images/bg-sidebar-mobile.svg";
import Footer from "../Footer/Footer";

export default function UserForm() {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const issueRequest = async (userName, description, location) => {
    try {
      const newIssue = await axios.post(`./api/issues`, {
        issue: {
          userName: userName,
          description: description,
          location: location,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.image}>{/* <img src={image.src} /> */}</div>
      <div className={styles.form}>
        <FormContent
          userName={userName}
          setUserName={setUserName}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
        />
      </div>
      <Footer onClick={issueRequest} />
    </div>
  );
}
