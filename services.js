import axios from "axios";

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
  return await axios.post(`/api/statusChanges`, {
    statusChange: {
      status: "Solved",
      message: "Issue solved",
      issueId: issueId,
    },
  });
}
