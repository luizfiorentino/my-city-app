import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./StepTwoForm.module.css";
import { ubuntu } from "@/styles/fonts";
import Footer from "../../Shared/Footer";
import IssueContext from "@/utils/IssueContext";
import FormHeader from "../../Shared/Fields/FormHeader/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import Button from "@/components/Shared/Button/Button";
import FormWrapper from "../FormContent/FormWrapper";
import { geolocationApiCall } from "@/services";
import { userLocation } from "@/hooks/useLocation";
import StatusMessage from "../../Shared/StatusMessage/StatusMessage";
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
    // locationType,
    // setLocationType,
  } = useContext(IssueContext);

  const [locationType, setLocationType] = useState(null);
  const [userLocationError, setUserLocationError] = useState("");

  const submitCoordinates = () => {
    // setLatitude(parseFloat(latitude));
    // setLongitude(parseFloat(longitude));
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
    // setLatitude(null);
    // setLongitude(null);
    //context.setButtonInactive(true);
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
      // setLatitude("52.3732");
      // setLongitude("4.8914");
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

    //to do error handling
    // setLatitude(latitude);
    // setLongitude(longitude);
    // const response = await geolocationApiCall(latitude, longitude);
    // const [error, address] = response;
    //to do error handling
    // setIssueAddress(address);
    // setLoading(false);
  };

  const updateLocation = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
    updateAddress(latitude, longitude);
  };

  useEffect(() => {
    if (latitude) {
      const displayMap = async () => {
        setLoading(true);
        try {
          await setLatitude(parseFloat(latitude));
          await setLongitude(parseFloat(longitude));

          setLoading(false);
        } catch (error) {
          console.log(
            "An error occurred while submitting location",
            error.message
          );
          setLoading(false);
        }
      };

      displayMap();
    }
  }, [latitude, longitude, setLatitude, setLongitude, setLoading]);

  return (
    <div>
      <div className={` ${ubuntu.className} `}>
        <div className={styles.formContent}>
          <FormWrapper>
            <FormHeader>Location</FormHeader>
            <FormSubtitle>
              Select an option to inform the location of the issue.
            </FormSubtitle>
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
              <div>
                <UserLocation
                  locationType={locationType}
                  updateLocation={updateLocation}
                  latitude={latitude}
                  longitude={longitude}
                  loading={loading}
                />
              </div>
            )}
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
          // backButton={true}
        >
          {"Next"}
        </Footer>
      </div>
    </div>
  );
}
