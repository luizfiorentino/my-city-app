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
    .array(z.any())
    .max(3, "You can upload up to 3 images")
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // If no file is provided, consider it valid
        const fileSizeLimit = 1048576; // 1MB file size limit
        const acceptedExtensions = ["jpeg", "jpg", "png"]; // Accepted file extensions
        // Check if the number of files is within the limit
        if (value.length > 3) return false;
        // Validate each file
        for (const file of value) {
          const fileSize = file.size;
          const fileExtension = file.name.split(".").pop().toLowerCase();
          if (
            fileSize > fileSizeLimit ||
            !acceptedExtensions.includes(fileExtension)
          ) {
            return false;
          }
        }
        return true;
      },
      {
        message:
          "File must be in JPEG, JPG, or PNG format, be less than or equal to 1MB in size, and you can upload up to 3 images",
      }
    ),
});

export default function UserForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);

  console.log("PREVIEWS", previewSources);

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
    const currentFiles = watch("file");
    setValue("file", [...currentFiles, ...acceptedFiles]);
    console.log("accepted files", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png",
  });

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  const selectedFiles = watch("file");
  console.log("SELECTED FILES", selectedFiles);

  useEffect(() => {
    if (selectedFiles) {
      generatePreviews(selectedFiles);
    }
  }, [selectedFiles]);

  const generatePreviews = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSources((prevState) => {
          if (!prevState.includes(reader.result)) {
            return [...prevState, reader.result];
          }
          return prevState;
        });
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

  const remove = (event) => {
    event.preventDefault();
    setValue("file", []);
    setPreviewSources([]);
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
              getRootProps={{ ...getRootProps() }}
              getInputProps={{ ...getInputProps() }}
              isDragActive={isDragActive}
            />
            <button onClick={(event) => remove(event)}>Remove files</button>
            {errorPosting && (
              <p className={styles.errorMessage}>
                An error occured when posting the issue. Please try again or
                contact admin
              </p>
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
