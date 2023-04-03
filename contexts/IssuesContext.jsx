// import React, { useState, createContext, useContext } from "react";

// export const issuesContext = createContext({});

// export default function IssuesContextProvider(props) {
//   const [userName, setUserName] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");

//   const name = () => {
//     (e) => setUserName(e.target.value);
//   };

//   const issue = () => {
//     (e) => setDescription(e.target.value);
//   };

//   const place = () => {
//     (e) => setLocation(e.target.value);
//   };

//   return (
//     <div>
//       <issuesContext.Provider
//         value={{
//           userName: userName,
//           description: description,
//           location: location,
//           name,
//           issue,
//           place,
//         }}
//       >
//         {props.children}
//       </issuesContext.Provider>
//     </div>
//   );
// }
