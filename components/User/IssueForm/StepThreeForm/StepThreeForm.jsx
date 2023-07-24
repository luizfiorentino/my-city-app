import React, { useState, useEffect, useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { ubuntu } from "@/styles/fonts";
import styles from "./StepThreeForm.module.css";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import ConfirmationMessage from "../ConfirmationMessage";
import { postIssue } from "@/services";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import IssueContext from "@/utils/IssueContext";
import StepIndicator from "../../Shared/StepIndicator/StepIndicator";
import StepOneForm from "../StepOneForm/StepOneForm";
import StepTwoForm from "../StepTwoForm/StepTwoForm";

const formSchema = z.object({
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

export default function StepThreeForm() {
  const context = useContext(IssueContext);
  const [successRequest, setSuccessRequest] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(
    "state previewSources",
    previewSources,
    "address",
    context.latitude,
    context.issueAddress,
    context.stepOneFormData,
    "context.selectedStepForm === ",
    context.selectedStepForm
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
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
    context.setPreviewSources((prevSources) => {
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
          context.setPreviewSources([...results]);
        })
        .catch((error) => {
          console.log("Error generating previews:", error);
        });
    },
    [previewSources, setPreviewSources]
  );

  const uploadPhotos = async (data) => {
    console.log("data.file??? from upload photos", data.file);
    //Is correct!!

    if (!data.file) {
      context.setSelectedStepForm("CONFIRM DATA");
    }

    try {
      setLoading(true);

      // await data.file.map((file) => context.setUploadedPictures(file));
      await context.setUploadedPictures(data.file);

      reset();
      setSuccessRequest(true);
      setPreviewSources([]);

      setLoading(false);
      context.setSelectedStepForm("CONFIRM DATA");
    } catch (error) {
      // Handle error
      console.log("An error occurred while submitting form data:");
      setErrorPosting(true);
      setPreviewSources([]);

      setLoading(false);
    }
  };

  const backStepTwo = () => {
    context.setLatitude(null);
    context.setLongitude(null);

    context.setSelectedStepForm("LOCATION");
    context.setButtonInactive(false);
    console.log("kwak to location");
  };

  return (
    <div className={`${styles.main} ${ubuntu.className}`}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(uploadPhotos)}>
          <FormContent
            errors={errors}
            previewSources={previewSources}
            getRootProps={{ ...getRootProps() }}
            getInputProps={{ ...getInputProps() }}
            isDragActive={isDragActive}
            removeFile={removeFile}
          />
          {errorPosting && (
            <p className={styles.errorMessage}>
              An error occured uploading the files. Please try again or contact
              admin.
            </p>
          )}

          <Footer
            className={styles.footer}
            backButton={true}
            onClick2={backStepTwo}
          >
            {"Next"}
            {loading ? <LoaderSpinner variant="submitBtn" /> : undefined}
          </Footer>
        </form>
      </div>
    </div>
  );
}
