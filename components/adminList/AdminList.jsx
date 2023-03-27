import React from "react";

export default function AdminList(props) {
  //console.log("props.issues", props.issues);
  return (
    <div>
      <h2>Check out the list of issues</h2>
      {props.issues.length ? (
        <h3>There are {props.issues.length} reports posted by the users:</h3>
      ) : (
        <h3>No issues posted yet</h3>
      )}{" "}
      <ol>
        {props.issues.map((issue) => {
          return <li key={issue}>{issue}</li>;
        })}
      </ol>
    </div>
  );
}
