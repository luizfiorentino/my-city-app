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
  emailRegister,
  previewSources,
  getRootProps,
  getInputProps,
  isDragActive,
  removeFile,
}) {
  const [locationType, setLocationType] = useState(null);
  const context = useContext(IssueContext);

  const getUserCurrentLocation = async () => {
    context.setLoading(true);

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      context.setLoading(false);
      return;
    }

    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (location) => resolve(location),
        (error) => reject(error)
      );
    });

    if (!location) {
      console.log("Error when getting your geolocation");
      context.setLoading(false);
      return;
    }
    const { latitude, longitude } = location.coords;
    context.setLatitude(latitude);
    context.setLongitude(longitude);
    console.log(
      "Form content, context.loaction",
      context.latitude,
      context.longitude
    );

    const response = await geolocationApiCall(latitude, longitude);
    const [error, _address] = response;

    if (error) {
      console.log(
        "(FormContent getUserCurrentLocation (geolocationApiCall))- An error occurred when fetching the address with the informed coordinates"
      );
      context.setLoading(false);
      return;
    }

    context.setLoading(false);
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
    context.setButtonInactive(true);
  };

  const geolocationApiCall = async (latitude, longitude) => {
    const apiUrl = `/api/geolocation?latitude=${latitude}&longitude=${longitude}`;
    console.log("FromContent, geolocationApiCall- apiUrl", apiUrl);
    console.log("FormContent, ");
    const domain = window.location.origin;
    const headers = {
      "x-domain-header": domain,
    };
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    console.log("FormContent geolocationApiCall, response?", response);

    if (!response.ok) {
      console.log(
        "(FormContent- geolocationApiCall)No address found for the given coordinates."
      );
      return ["No address found.", null];
    }
    const { address } = data;
    context.setIssueAddress(address);
    context.setButtonInactive(false);

    return [null, address];
  };

  return (
    <div className={styles.formContent}>
      {context.selectedStepForm === "INFOS" && (
        <>
          <FormHeader>Reports data</FormHeader>
          <FormSubtitle>
            Please provide your name, email and description of the issue.
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
            label="Email (optional, to get folow ups)"
            placeHolder="e.g. mike@ness.com"
            error={errors.email}
            register={emailRegister}
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
        </>
      )}
      {context.selectedStepForm === "LOCATION" && (
        <>
          <FormHeader>Location</FormHeader>
          <FormSubtitle>
            Select an option to inform the location of the issue.
          </FormSubtitle>
        </>
      )}
      {context.selectedStepForm === "LOCATION" && (
        <div>
          <UserLocation locationType={locationType} />
        </div>
      )}
      {context.selectedStepForm === "LOCATION" && (
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
            <Button
              variant="lightGrey"
              onClick={(e) => locationChoice("map", e)}
            >
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
      )}

      {context.selectedStepForm === "PICTURES" && (
        <>
          <FormHeader>Images</FormHeader>
          <FormSubtitle>
            Optionally you can upload photos of the issue!
          </FormSubtitle>
          <FormInput label="Max. 3 pictures/ 1MB each" variant="photos" />
        </>
      )}
      {context.selectedStepForm === "PICTURES" && (
        <div
          className={
            !previewSources.length ? styles.hidden : styles.uploadImage
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
      )}
      {context.selectedStepForm === "PICTURES" && (
        <div>
          {errors.file && <StatusMessage>{errors.file.message}</StatusMessage>}
        </div>
      )}
      {context.selectedStepForm === "PICTURES" && (
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
      )}
    </div>
  );
}
