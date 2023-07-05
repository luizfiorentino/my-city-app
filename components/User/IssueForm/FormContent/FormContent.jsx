import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";
import { AiOutlineUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ErrorMessage from "../../Shared/StatusMessage/StatusMessage";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import IssueContext from "@/utils/IssueContext";
import Button from "@/components/Shared/Button/Button";

const UserLocation = dynamic(() => import("../UserLoaction/UserLocation"), {
  ssr: false,
});

export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
  previewSources,
  getRootProps,
  getInputProps,
  isDragActive,
  removeFile,
}) {
  const [locationType, setLocationType] = useState(null);
  const context = useContext(IssueContext);

  const getUserCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          context.setLatitude(latitude);
          context.setLongitude(longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
      // context.setLoadingMap(false);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const locationChoice = (choice, e) => {
    if (choice === "current") {
      e.preventDefault();
      getUserCurrentLocation();
      setLocationType("current");
    }
    if (choice === "map") {
      e.preventDefault();
      //Set Amsterdam Dam city center as default
      context.setLatitude(52.3732);
      context.setLongitude(4.8914);
      setLocationType("map");
    }
  };

  const backToLocationSelection = (e) => {
    e.preventDefault();
    setLocationType(null);
  };

  return (
    <div className={styles.formContent}>
      <FormHeader>Reports data</FormHeader>
      <FormSubtitle>
        Please provide your name, description and location of the issue.
      </FormSubtitle>

      <FormInput
        label="Name"
        placeHolder="e.g. Mike Ness"
        error={errors.userName}
        register={userRegister}
        type="text"
        name="userName"
      />

      <FormInput
        label="Description"
        placeHolder="e.g. there is something..."
        error={errors.description}
        register={descriptionRegister}
        type="text"
        name="description"
      />
      <FormInput
        variant="photos"
        label="Choose a form of location"
        placeHolder="e.g. Dijkstraat 123. Amsterdam"
        error={errors.location}
        register={locationRegister}
        type="text"
        name="location"
      />
      <div className={locationType !== null ? styles.location : styles.hidden}>
        <UserLocation locationType={locationType} />
      </div>
      <div className={styles.locationButtons}>
        {locationType === null && locationType !== "current" && (
          <Button
            variant="lightGrey"
            onClick={(e) => locationChoice("current", e)}
          >
            Share current location
          </Button>
        )}
        {locationType === null && locationType !== "map" && (
          <Button variant="lightGrey" onClick={(e) => locationChoice("map", e)}>
            Choose on the map
          </Button>
        )}
        {(locationType !== null ||
          locationType === "current" ||
          locationType === "map") && (
          <Button
            variant="lightGrey"
            onClick={(e) => backToLocationSelection(e)}
          >
            Back
          </Button>
        )}
      </div>

      <FormInput label="Pictures (optional, max. 3)" variant="photos" />
      <div
        className={
          !previewSources.length ? styles.hiddenInput : styles.uploadImage
        }
      >
        <div className={styles.imageArea}>
          {previewSources &&
            previewSources.map((src, index) => (
              <div key={index} className={styles.imagePreviewContainer}>
                <img className={styles.imagePreview} src={src} alt="chosen" />
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
        {errors.file && <ErrorMessage>{errors.file.message}</ErrorMessage>}
      </div>
      <div
        className={styles.dropzone}
        {...getRootProps}
        style={{ color: "black" }}
      >
        <input {...getInputProps} />
        {isDragActive ? (
          <FormSubtitle variant="dragDrop">Drop files here</FormSubtitle>
        ) : (
          <FormSubtitle variant="dragDrop">
            Drag and drop files or click here
            <AiOutlineUpload className={styles.uploadIcon} />
          </FormSubtitle>
        )}
      </div>
    </div>
  );
}
