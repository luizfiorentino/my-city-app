import "@/styles/globals.css";
// import IssueContextProvider from "@/utils/IssueContext";
import { useState, createContext } from "react";
import { set } from "zod";
import issueContext from "../utils/IssueContext";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <issueContext.Provider
      value={{ loading, setLoading, openModal, setOpenModal }}
    >
      {" "}
      <Component {...pageProps} />
    </issueContext.Provider>
  );
}
