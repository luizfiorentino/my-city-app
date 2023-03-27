import React from "react";

export default function IssueCard(props) {
  return (
    <div>
      <p>#AMS001275</p>
      <p>{props.userName}</p>
      <p>{props.description}</p>
      <p>{props.location}</p>
      <p>Submited</p>
    </div>
  );
}
