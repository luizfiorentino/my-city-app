import React, { useState, useEffect, useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { ubuntu } from "@/styles/fonts";
import styles from "./StepThreeForm.module.css";
import Footer from "../../Shared/Footer";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import IssueContext from "@/utils/IssueContext";
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import { BsTrash } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";
import FormInput from "../../Shared/Fields/FormInput/FormInput";
import StatusMessage from "../../Shared/StatusMessage/StatusMessage";
import FormWrapper from "../FormContent/FormWrapper";
import ConfirmationMessage from "../ConfirmationMessage";
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

  const [errorPosting, setErrorPosting] = useState(false);
  const [previewSources, setPreviewSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      file: context.uploadedPictures ? context.uploadedPictures : [],
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
    if (!data.file) {
      context.setSelectedStepForm("CONFIRM DATA");
    }

    try {
      setLoading(true);

      // await data.file.map((file) => context.setUploadedPictures(file));
      await context.setUploadedPictures(data.file);

      reset();

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
    // context.setLatitude(null);
    // context.setLongitude(null);
    context.setSelectedStepForm("LOCATION");
    context.setButtonInactive(false);
  };

  return (
    <div>
      <div className={` ${ubuntu.className} `}>
        <ConfirmationMessage
          title="Images"
          subtitle="              Optionally you can upload photos of the issue!
            "
        ></ConfirmationMessage>
        <div className={styles.formContent}>
          <FormWrapper>
            <FormInput label="Max. 3 pictures/ 1MB each" variant="photos" />
            <div
              className={
                !previewSources.length ? styles.hidden : styles.uploadImage
              }
            >
              <div className={styles.imageArea}>
                {previewSources &&
                  previewSources.map((src, index) => (
                    <div key={index} className={styles.imagePreviewContainer}>
                      <img
                        className={styles.imagePreview}
                        src={src}
                        alt="chosen"
                      />
                      <button
                        className={styles.removeButton}
                        //preventDefault avoids submitting the form before clicking the button
                        onClick={(event) => {
                          event.preventDefault();
                          removeFile(index);
                        }}
                      >
                        <BsTrash className={styles.deleteIcon} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              {errors.file && (
                <StatusMessage>{errors.file.message}</StatusMessage>
              )}
            </div>
            <div>
              <div
                className={styles.dropzone}
                {...getRootProps()}
                style={{ color: "black" }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <FormSubtitle variant="dragDrop">
                    Drop files here
                  </FormSubtitle>
                ) : (
                  <FormSubtitle variant="dragDrop">
                    Drag and drop files or click here
                    <AiOutlineUpload className={styles.uploadIcon} />
                  </FormSubtitle>
                )}
              </div>
            </div>
            {errorPosting && (
              <p className={styles.errorMessage}>
                An error occured uploading the files. Please try again or
                contact admin.
              </p>
            )}
          </FormWrapper>
        </div>
        <Footer goForward={handleSubmit(uploadPhotos)} goBack={backStepTwo}>
          {"Next"}
          {loading ? <LoaderSpinner variant="submitBtn" /> : undefined}
        </Footer>
      </div>
    </div>
  );
}
