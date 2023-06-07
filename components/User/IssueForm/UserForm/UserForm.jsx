import React, { useState } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationMessage from "../ConfirmationMessage";
import { ubuntu } from "@/styles/fonts";
import NewForm from "../../NewForm/NewForm";

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
    setSelectedFile(file);
    console.log("selected file", file);
    setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    uploadImage();
  };

  const uploadImage = async () => {
    console.log("BEFORE FORMDATA CONST", selectedFile, "FILE:::::");
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
        },
      });
      console.log("Uploaded to Cloudinary", response.data.imageUrl);
      setFileInputState("");
      setPreviewSource("");
      console.log("FORM DATA", formData);
    } catch (err) {
      console.error(err.response);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      console.log("PREVIEW FILE", reader.result);
    };
  };

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

      reset();

      setSuccessRequest(true);
      // console.log("ID NEW ISSUE ->", newIssue.id);
    } catch (e) {
      console.log(e.message);
    }
  };

  //console.log("successRequest", successRequest);

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  console.log("selectedFile", selectedFile);

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <NewForm></NewForm>
      <div className={styles.image}>{/* <img src={image.src} /> */}</div>

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
            />
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            )}
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
        )}{" "}
        <div>
          <h1>Upload</h1>
          <form onSubmit={handleSubmitFile}>
            <p>
              <label>
                File to stash:
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                />
              </label>
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              )}
            </p>
            <p>
              <input type="submit" value="Stash the file!" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
