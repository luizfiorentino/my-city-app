import axios from "axios";

export async function postIssue({ file, ...data }) {
  try {
    const response = await axios.postForm("/api/issues", {
      file: file[0],
      ...data,
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
