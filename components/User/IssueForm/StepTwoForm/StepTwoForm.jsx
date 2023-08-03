import React, { useContext, useEffect } from "react";
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
    locationType,
    setLocationType,
  } = useContext(IssueContext);

  useEffect(() => {
    setButtonInactive(true);
  }, []);

  // eventually remove "async await" statements
  const submitCoordinates = async () => {
    setLoading(true);
    try {
      await setLatitude(parseFloat(latitude));
      await setLongitude(parseFloat(longitude));

      setSelectedStepForm("PICTURES");
      setLoading(false);
    } catch (error) {
      console.log("An error occurred while submitting location", error.message);
      setLoading(false);
    }
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
  }, [latitude]);
  const backStepOne = () => {
    // setStepOneFormData({
    //   userName: "",
    //   email: "",
    //   description: "",
    // });

    setSelectedStepForm("INFOS");
    setButtonInactive(false);
  };

  const getUserCurrentLocation = async () => {
    setLoading(true);

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
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
      setLoading(false);
      return;
    }
    const { latitude, longitude } = location.coords;
    setLatitude(latitude);
    setLongitude(longitude);

    const response = await geolocationApiCall(latitude, longitude);
    const [error, _address] = response;

    if (error) {
      console.log(
        "An error occurred when fetching the address with the informed coordinates"
      );
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const geolocationApiCall = async (latitude, longitude) => {
    const apiUrl = `/api/geolocation?latitude=${latitude}&longitude=${longitude}`;

    const domain = window.location.origin;
    const headers = {
      "x-domain-header": domain,
    };
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    if (!response.ok) {
      return ["No address found.", null];
    }
    const { address } = data;
    setIssueAddress(address);
    setButtonInactive(false);

    return [null, address];
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
      setLatitude("52.3732");
      setLongitude("4.8914");
      setLocationType("map");
    }
  };

  const backToLocationSelection = (e) => {
    e.preventDefault();
    setLocationType(null);
    setLatitude(null);
    setLongitude(null);
    //context.setButtonInactive(true);
  };

  return (
    <div className={` ${ubuntu.className}  ${styles.formContent}`}>
      <FormWrapper>
        <FormHeader>Location</FormHeader>
        <FormSubtitle>
          Select an option to inform the location of the issue.
        </FormSubtitle>
        {loading ? (
          <p className={styles.loadingContainer}>
            Loading your location...
            <LoaderSpinner />
          </p>
        ) : (
          <div>
            <UserLocation locationType={locationType} />
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

        <div>
          <Footer
            className={styles.footer}
            onClick={() => submitCoordinates()}
            onClick2={backStepOne}
            backButton={true}
          >
            {"Next"}
          </Footer>
        </div>
      </FormWrapper>
    </div>
  );
}
