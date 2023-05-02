import React from "react";
import { createContext, useContext } from "react";

const IssueContext = createContext();

export default IssueContext;

// export default function IssueContextProvider() {
//   const editStatus = async (message) => {
//     try {
//       const newStatus = await axios.post(`../../api/statusChanges`, {
//         statusChange: {
//           status: props.status,
//           message: props.message,
//           issueId: props.arrayChanges[0]["issueId"],
//         },
//       });
//       return newStatus;
//       //console.log("NEW STATUS", newStatus);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   return (
//     <div>
//       <issueContext.Provider value={{ editStatus, newStatus, message }}>
//         {props.children}
//       </issueContext.Provider>
//     </div>
//   );
// }
