import React, { useState, useEffect, useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { ubuntu } from "@/styles/fonts";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import ConfirmationMessage from "../ConfirmationMessage";
import { postIssue } from "@/services";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import IssueContext from "@/utils/IssueContext";
import StepIndicator from "../../Shared/StepIndicator/StepIndicator";

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
    .max(255, "the provided location contains too much characters"),
  email: z
    .string()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Please provide a valid email address or leave it empty",
      }
    ),
  file: z
    .array(z.any())
    .max(3, "You can upload up to 3 images")
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const acceptedExtensions = ["jpeg", "jpg", "png"]; // Accepted file extensions
        // Validate each file
        for (const file of value) {
          const fileExtension = file.name.split(".").pop().toLowerCase();
          if (!acceptedExtensions.includes(fileExtension)) {
            return false;
          }
        }
        return true;
      },
      {
        message: "File must be in JPEG, JPG, or PNG format.",
      }
    )
    .refine(
      (value) => {
        if (!value) return true;
        const fileSizeLimit = 1048576; // 1MB file size limit
        for (const file of value) {
          const fileSize = file.size;
          if (fileSize > fileSizeLimit) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Files must be smaller or equal to 1MB.",
      }
    ),
});

import { toDataURL } from "qrcode";

// URL to be encoded in the QR code
const url =
  "https://my-city-app-git-main-luizfiorentino.vercel.app/?vercelToolbarCode=rgrbfhEizGUl1AP";

// Generate the QR code as a data URL
toDataURL(url, (err, dataUrl) => {
  if (err) {
    console.error("Error generating QR code:", err);
    return;
  }
  console.log("QR code generated successfully.");
  console.log("Data URL:", dataUrl);
});

const formSteps = ["INFOS", "LOCATION", "PICTURES", "CONFIRM DATA"];

export default function UserForm() {
  const context = useContext(IssueContext);
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("index:", selectedIndex);

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
    const uniqueFiles = acceptedFiles.filter(
      (file) =>
        currentFiles.find((existingFile) => existingFile.path === file.path) ===
        undefined
    );
    setValue("file", [...currentFiles, ...uniqueFiles]);
  }, []);

  const removeFile = (index) => {
    const currentFiles = watch("file");
    // show only one if the same slected file at once
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setValue("file", updatedFiles);
    setPreviewSources((prevSources) => {
      const updatedSources = [...prevSources];
      updatedSources.splice(index, 1);
      return updatedSources;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const returnFormPage = () => {
    setSuccessRequest(false);
  };

  const selectedFiles = watch("file");

  useEffect(() => {
    if (selectedFiles) {
      generatePreviews(selectedFiles);
    }
  }, [selectedFiles]);

  const generatePreviews = useCallback(
    (files) => {
      // Generate previews for the selected files
      const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((results) => {
          setPreviewSources([...results]);
        })
        .catch((error) => {
          console.log("Error generating previews:", error);
        });
    },
    [previewSources, setPreviewSources]
  );

  const issueRequest = async (data) => {
    try {
      setLoading(true);
      const [error, _response] = await postIssue({
        ...data,
        latitude: parseFloat(context.latitude),
        longitude: parseFloat(context.longitude),
        location: context.issueAddress,
      });
      if (error) {
        console.log("Failed to submit data");
        setErrorPosting(true);
        return;
      }
      reset();
      setSuccessRequest(true);
      setPreviewSources([]);
      setLoading(false);
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
      <div className={styles.image}>
        <div className={styles.stepIndicators}>
          <div className={styles.indicators}>
            {formSteps.map((step, i) => (
              <StepIndicator
                number={i + 1}
                description={step}
                onClick={() => setSelectedIndex(i)}
                selected={selectedIndex === i ? true : false}
              />
            ))}
          </div>
        </div>
      </div>{" "}
      <div className={styles.form}>
        {successRequest === false ? (
          <form onSubmit={handleSubmit(issueRequest)}>
            <FormContent
              userRegister={{ ...register("userName") }}
              descriptionRegister={{ ...register("description") }}
              locationRegister={{ ...register("location") }}
              emailRegister={{ ...register("email") }}
              errors={errors}
              previewSources={previewSources}
              getRootProps={{ ...getRootProps() }}
              getInputProps={{ ...getInputProps() }}
              isDragActive={isDragActive}
              removeFile={removeFile}
            />
            {errorPosting && (
              <p className={styles.errorMessage}>
                An error occured when posting the issue. Please try again or
                contact admin.
              </p>
            )}
            <Footer className={styles.footer}>
              {successRequest === false ? "Post issue" : "Back"}
              {loading ? <LoaderSpinner variant="submitBtn" /> : undefined}
            </Footer>
          </form>
        ) : (
          <ConfirmationMessage
            title="Thanks for submiting your issue!"
            subtitle="Your report will make our city more awesome."
            onClick={returnFormPage}
          >
            Thanks for submitting your issue!
          </ConfirmationMessage>
        )}
      </div>
    </div>
  );
}
