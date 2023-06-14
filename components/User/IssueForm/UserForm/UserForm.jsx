import React, { useState, useEffect, useCallback } from "react";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationMessage from "../ConfirmationMessage";
import { ubuntu } from "@/styles/fonts";
import { postIssue } from "@/services";
import { useDropzone } from "react-dropzone";
import axios from "axios";

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
  file: z
    .any()
    .refine((value) => value && value[0]?.size <= 1048576, {
      message: "File size should be less than or equal to 1MB",
    })
    .refine(
      (value) => value && /^image\/(jpeg|jpg|png)$/i.test(value[0]?.type),
      {
        message: "File must be in JPEG, JPG, or PNG format",
      }
    ),
});

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
  const [images, setImages] = useState([]);

  console.log("preview source", previewSource);

  function handleUpload() {
    console.log("uploading files");
    axios
      .post("http://localhost:4000/upload", { images })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prevState) => [...prevState, reader.result]);
        };
        reader.readAsDataURL(file);
      });

      console.log(
        "acceptedFiles",
        acceptedFiles,
        "rejected files",
        rejectedFiles
      );
    },
    [images]
  );

  useEffect(() => console.log(images), [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png",
  });

  console.log(
    "getInputProps",
    getInputProps(),
    "getRootProps",
    getInputProps()
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValues,
    setValue,
    reset,
    watch,
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

  const issueRequest = async (data) => {
    try {
      const [error, _response] = await postIssue(data);

      if (error) {
        console.log("Failed to submit data");
        setErrorPosting(true);
        return;
      }

      reset();
      setSuccessRequest(true);
      setPreviewSource("");
    } catch (error) {
      // Handle error
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );

      setErrorPosting(true);
      setPreviewSource("");
    }
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.image}></div>

      <div className={styles.form}>
        {successRequest === false ? (
          <form onSubmit={handleSubmit(issueRequest)}>
            <FormContent
              userRegister={{ ...register("userName") }}
              descriptionRegister={{ ...register("description") }}
              locationRegister={{ ...register("location") }}
              fileRegister={{ ...register("file") }}
              errors={errors}
              previewSource={previewSource}
            />
            {errorPosting && (
              <p className={styles.errorMessage}>
                An error occured when posting the issue. Please try again or
                contact admin
              </p>
            )}
            <div
              className={styles.dropzone}
              {...getRootProps()}
              style={{ color: "black" }}
            >
              <input {...getInputProps()} />
              {isDragActive ? "Drag Active" : "You can drop your files here."}
              {images.length && (
                <div>
                  {images.map((image, index) => (
                    <img
                      src={image}
                      key={index}
                      className={styles.selectedImages}
                    />
                  ))}
                </div>
              )}
              {images.length && (
                <button onClick={handleUpload}>Upload images</button>
              )}
            </div>
            {images.length && (
              <button onClick={handleUpload}>Upload images</button>
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
