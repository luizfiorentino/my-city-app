import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./StepTwoForm.module.css";
import { ubuntu } from "@/styles/fonts";
import Footer from "../../Shared/Footer";
import IssueContext from "@/utils/IssueContext";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import Button from "@/components/Shared/Button/Button";
import FormWrapper from "../FormContent/FormWrapper";
import { geolocationApiCall } from "@/services";
import { userLocation } from "@/hooks/useLocation";
import StatusMessage from "../../Shared/StatusMessage/StatusMessage";
import ConfirmationMessage from "../ConfirmationMessage";

const UserLocation = dynamic(() => import("../UserLocation/UserLocation"), {
  ssr: false,
});

export default function StepTwoForm() {
  const {
    setLoading,
    setButtonInactive,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    loading,
    setSelectedStepForm,
    setIssueAddress,
  } = useContext(IssueContext);

  const [locationType, setLocationType] = useState(null);
  const [userLocationError, setUserLocationError] = useState("");

  const submitCoordinates = () => {
    setSelectedStepForm("PICTURES");
  };

  const backStepOne = () => {
    setSelectedStepForm("INFOS");
    setButtonInactive(false);
  };

  const backToLocationSelection = (e) => {
    e.preventDefault();
    setLocationType(null);
    setUserLocationError("");
  };

  const locationChoice = (choice, e) => {
    setUserLocationError("");
    if (choice === "current") {
      e.preventDefault();
      getUserCurrentLocation();
      setLocationType("current");
    }
    if (choice === "map") {
      e.preventDefault();
      //Set Amsterdam Dam City Center as default
      updateLocation(52.3732, 4.8914);
      setLocationType("map");
    }
  };

  const updateAddress = async (latitude, longitude) => {
    const response = await geolocationApiCall(latitude, longitude);
    const [error, address] = response;
    //consider moving this to backend (not error handling here)
    setIssueAddress(address);
  };

  const getUserCurrentLocation = async () => {
    setLoading(true);

    const [locationError, location] = await userLocation();
    setLoading(false);

    if (locationError) {
      return setUserLocationError(
        "Select 'Choose on the map' option or enable your location in the browser"
      );
    }
    const { latitude, longitude } = location;
    updateLocation(latitude, longitude);
  };

  const updateLocation = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
    updateAddress(latitude, longitude);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={` ${ubuntu.className} `}>
        <ConfirmationMessage
          title="Location"
          subtitle=" Select an option to inform the location of the issue."
        ></ConfirmationMessage>
        <div className={styles.formContent}>
          <FormWrapper>
            <div>
              {userLocationError && (
                <StatusMessage>{userLocationError}</StatusMessage>
              )}
            </div>
            {loading ? (
              <p className={styles.loadingContainer}>
                Loading your location...
                <LoaderSpinner />
              </p>
            ) : (
              <UserLocation
                locationType={locationType}
                updateLocation={updateLocation}
                latitude={latitude}
                longitude={longitude}
                loading={loading}
              />
            )}
            <div></div>

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
          </FormWrapper>
        </div>
        <Footer
          className={styles.footer}
          goForward={() => submitCoordinates()}
          isGoForwardDisabled={!latitude || !longitude}
          goBack={backStepOne}
        >
          {"Next"}
        </Footer>
      </div>
    </div>
  );
}
