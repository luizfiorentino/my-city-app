import axios from "axios";

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
    const response = await axios.postForm("/api/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Service response", response);
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
