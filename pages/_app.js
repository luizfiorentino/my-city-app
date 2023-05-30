import "@/styles/globals.css";
// import IssueContextProvider from "@/utils/IssueContext";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

import issueContext from "../utils/IssueContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  //console.log("session", session);

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [signedInAs, setSignedInAs] = useState(null);

  return (
    <SessionProvider session={session}>
      <issueContext.Provider
        value={{
          loading,
          setLoading,
          openModal,
          setOpenModal,
          signedInAs,
          setSignedInAs,
        }}
      >
        {" "}
        <Component {...pageProps} />
      </issueContext.Provider>
    </SessionProvider>
  );
}
