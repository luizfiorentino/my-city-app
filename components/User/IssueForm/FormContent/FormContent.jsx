import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";
import { AiOutlineUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import StatusMessage from "../../Shared/StatusMessage/StatusMessage";
import IssueContext from "@/utils/IssueContext";
import Button from "@/components/Shared/Button/Button";

const UserLocation = dynamic(() => import("../UserLocation/UserLocation"), {
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
      context.setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          context.setLatitude(latitude);
          context.setLongitude(longitude);
          geolocationApiCall(latitude, longitude);
          context.setLoading(false);
        },

        (error) => {
          setError(error.message);
          context.setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      context.setLoading(false);
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
      //Set Amsterdam Dam City Center as default
      context.setLatitude(52.3732);
      context.setLongitude(4.8914);
      setLocationType("map");
    }
  };

  const backToLocationSelection = (e) => {
    e.preventDefault();
    setLocationType(null);
  };

  async function geolocationApiCall(latitude, longitude) {
    const apiUrl = `/api/geolocation?latitude=${latitude}&longitude=${longitude}`;

    try {
      const domain = window.location.origin; // Get the current domain
      const headers = {
        "x-domain-header": domain, // Set the custom header with the domain
      };
      console.log("frontend:", headers);
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();

      if (response.ok) {
        const { address } = data;
        context.setIssueAddress(address);
      } else {
        console.log("No address found for the given coordinates.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }

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
        className={!previewSources.length ? styles.hidden : styles.uploadImage}
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
        {errors.file && <StatusMessage>{errors.file.message}</StatusMessage>}
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
