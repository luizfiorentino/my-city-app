import "@/styles/globals.css";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import issueContext from "../utils/IssueContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false);
  const [buttonInactive, setButtonInactive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [buttonMode, setButtonMode] = useState("");
  const [filterIssuesByStatus, setFilterIssueByStatus] = useState("All");
  const [loadingMap, setLoadingMap] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [issueAddress, setIssueAddress] = useState("Amsterdam");
  const [selectedStepForm, setSelectedStepForm] = useState("INFOS");
  const [stepOneFormData, setStepOneFormData] = useState({
    userName: "",
    email: "",
    description: "",
  });
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const [previewSources, setPreviewSources] = useState([]);
  const [locationType, setLocationType] = useState(null);

  return (
    <SessionProvider session={session}>
      <issueContext.Provider
        value={{
          loading,
          setLoading,
          openModal,
          setOpenModal,
          buttonMode,
          setButtonMode,
          filterIssuesByStatus,
          setFilterIssueByStatus,
          longitude,
          setLongitude,
          latitude,
          setLatitude,
          loadingMap,
          setLoadingMap,
          issueAddress,
          setIssueAddress,
          selectedStepForm,
          setSelectedStepForm,
          stepOneFormData,
          setStepOneFormData,
          uploadedPictures,
          setUploadedPictures,
          previewSources,
          setPreviewSources,
          buttonInactive,
          setButtonInactive,
          locationType,
          setLocationType,
        }}
      >
        <Component {...pageProps} />
      </issueContext.Provider>
    </SessionProvider>
  );
}
