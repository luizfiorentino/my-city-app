import "@/styles/globals.css";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import issueContext from "../utils/IssueContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filterIssuesByStatus, setFilterIssueByStatus] = useState("all");
  const [loadingMap, setLoadingMap] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <SessionProvider session={session}>
      <issueContext.Provider
        value={{
          loading,
          setLoading,
          openModal,
          setOpenModal,
          filterIssuesByStatus,
          setFilterIssueByStatus,
          longitude,
          setLongitude,
          latitude,
          setLatitude,
          loadingMap,
          setLoadingMap,
        }}
      >
        {" "}
        <Component {...pageProps} />
      </issueContext.Provider>
    </SessionProvider>
  );
}
