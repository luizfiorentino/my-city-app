import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationMessage from "../ConfirmationMessage";
import { ubuntu } from "@/styles/fonts";

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
  file: z.any(),
});

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const { watch } = useForm();

  const selectedFiles = watch("file");

  useEffect(() => {
    if (selectedFiles) {
      previewFile(selectedFiles[0]);
    }
  }, [selectedFiles]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
    setSelectedFile(file);
  };

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
      file: null,
    },
    // mode: "all", --> don't use, it's users unfriendly
    resolver: zodResolver(formSchema),
  });

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  const issueRequest = async (data) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("description", data.description);
      formData.append("location", data.location);

      // formData.append("file", selectedFile);
      formData.append("file", data.file[0]);

      const response = await fetch("/api/issues", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success
        console.log("Form data submitted successfully");
        reset();
        setSuccessRequest(true);
      } else {
        // Handle error
        console.log("Failed to submit form data");
      }
    } catch (error) {
      // Handle error
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
    }
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}></div>

      <div className={styles.form}>
        {" "}
        {successRequest === false ? (
          <form onSubmit={handleSubmit(issueRequest)}>
            {" "}
            <FormContent
              userRegister={{ ...register("userName") }}
              descriptionRegister={{ ...register("description") }}
              locationRegister={{ ...register("location") }}
              errors={errors}
              register={register}
              handleFileInputChange={handleFileInputChange}
              fileInputState={fileInputState}
            />
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            )}
            <Footer>{successRequest === false ? "Post issue" : "Back"}</Footer>
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
