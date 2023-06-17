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
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import { AiOutlineUpload } from "react-icons/ai";

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
  file: z.any().optional(),
  // .refine((value) => value && value[0]?.size <= 1048576, {
  //   message: "File size should be less than or equal to 1MB",
  // })
  // .refine(
  //   (value) => value && /^image\/(jpeg|jpg|png)$/i.test(value[0]?.type),
  //   {
  //     message: "File must be in JPEG, JPG, or PNG format",
  //   }
  // ),
});

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      userName: "",
      description: "",
      location: "",
      file: [],
    },
    // mode: "all", --> don't use, it's users unfriendly
    resolver: zodResolver(formSchema),
  });

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setValue("file", acceptedFiles);
  }, []);

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

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  const selectedFiles = watch("file");

  useEffect(() => {
    if (selectedFiles) {
      generatePreviews(selectedFiles);
    }
  }, [selectedFiles]);

  const generatePreviews = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSources((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
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
      setPreviewSources([]);
    } catch (error) {
      // Handle error
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
      setErrorPosting(true);
      setPreviewSources([]);
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
              errors={errors}
              previewSources={previewSources}
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
              <FormSubtitle></FormSubtitle>

              <input {...getInputProps()} />
              {isDragActive ? (
                <FormSubtitle variant="dragDrop">Drag Active</FormSubtitle>
              ) : (
                <FormSubtitle variant="dragDrop">
                  {" "}
                  Drag n' drop files or click here{" "}
                  <AiOutlineUpload className={styles.uploadIcon} />
                </FormSubtitle>
              )}
            </div>

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
