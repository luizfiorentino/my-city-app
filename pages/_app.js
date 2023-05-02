import "@/styles/globals.css";
// import IssueContextProvider from "@/utils/IssueContext";
import { useState, createContext } from "react";
import { set } from "zod";
import issueContext from "../utils/IssueContext";

export default function App({ Component, pageProps }) {
  const [currentMessage, setCurrentMessage] = useState("");
  return (
    <issueContext.Provider value={{ currentMessage, setCurrentMessage }}>
      {" "}
      <Component {...pageProps} />
    </issueContext.Provider>
  );
}
