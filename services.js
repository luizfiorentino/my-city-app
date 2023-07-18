import axios from "axios";

export async function sendEmail(to, subject, text, html) {
  const url = "/api/updateEmail";
  console.log("from services sendEmail f:", "to:", to, "subject:", subject);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, subject, text, html }),
  });

  if (response.ok) {
    console.log("Email sent successfully");
  } else {
    console.error("Failed to send email");
  }
}

export async function postIssue({ file, ...data }) {
  const formData = new FormData();
  // "in" return the keys
  for (let field in data) {
    formData.append(field, data[field]);
    //same as
    //formData.append("name", data.name)
    //formData.append("description", data.description)
  }

  //"of" returns values
  for (let eachFile of file) {
    formData.append("file", eachFile);
  }

  try {
    console.log("what is formData?", formData);
    const response = await axios.postForm("/api/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return [null, response];
  } catch (error) {
    console.log(error);
    return [error.response.statusText, null];
  }
}

export async function sendUpdateIssueRequest(status, message, issueId) {
  const response = await axios.post(`/api/statusChanges`, {
    statusChange: {
      status: status,
      message: message,
      issueId: issueId,
    },
  });

  return response.data.newChange;
}

export async function sendDeleteRequest(issueId) {
  return await axios.delete(`/api/issues/${issueId}`);
}

export async function sendSolvedUpdateRequest(issueId) {
  const response = await axios.post(`/api/statusChanges`, {
    statusChange: {
      status: "Solved",
      message: "Issue solved",
      issueId: issueId,
    },
  });

  return response.data.newChange;
}
