import React, { useState } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";
import Footer from "../Footer/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StatusMessage from "../../StatusMessage/StatusMessage";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { ubuntu } from "@/styles/fonts";

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);

  const formSchema = z.object({
    userName: z
      .string()
      .min(2, "user name must be at least 2 characters long")
      .max(255, "the provided user name contains too much characters"),
    description: z
      .string()
      .min(10, "description must be at least 10 characters long")
      .max(255, "the provided description contains too much characters"),
    location: z
      .string()
      .min(8, "location must be at least 8 characters long")
      .max(255, "the provided location contains too much characters"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      description: "",
      location: "",
    },
    // mode: "all", --> don't use, it's users unfriendly
    resolver: zodResolver(formSchema),
  });

  const issueRequest = async (data) => {
    try {
      const newIssue = await axios.post(`./api/issues`, {
        issue: {
          userName: data.userName,
          description: data.description,
          location: data.location,
        },
      });

      // setValue("userName", "");
      // setValue("description", "");
      // setValue("location", "");
      reset();

      setSuccessRequest(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log("successRequest", successRequest);

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}>{/* <img src={image.src} /> */}</div>

      <div className={styles.form}>
        {successRequest === false ? (
          <form onSubmit={handleSubmit(issueRequest)}>
            <FormContent
              userRegister={{ ...register("userName") }}
              descriptionRegister={{ ...register("description") }}
              locationRegister={{ ...register("location") }}
              errors={errors}
            />

            <Footer onClick={issueRequest}>
              {successRequest === false ? "Post issue" : "Back"}
            </Footer>
          </form>
        ) : (
          <ConfirmationMessage
            className={styles.successMessage}
            onClick={returnFormPage}
          >
            Thanks for submitting your issue!
          </ConfirmationMessage>
        )}
      </div>
    </div>
  );
}
