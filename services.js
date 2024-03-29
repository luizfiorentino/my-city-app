import axios from "axios";

export const geolocationApiCall = async (latitude, longitude) => {
  const apiUrl = `/api/geolocation?latitude=${latitude}&longitude=${longitude}`;

  const domain = window.location.origin;
  const headers = {
    "x-domain-header": domain,
  };

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    if (!response.ok) {
      return ["No address found.", null];
    }
    const { address } = data;

    // setButtonInactive(false);

    return [null, address];
  } catch (error) {
    console.log("error fetching geolocation");
    return [error, null];
  }
};

export async function sendEmail(to, subject, text, html) {
  const url = "/api/updateEmail";

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

// export async function postIssue({ file, ...data }) {
export async function postIssue({
  userName,
  description,
  location,
  email,
  latitude,
  longitude,
  file,
}) {
  const data = { userName, description, location, email, latitude, longitude };

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

    return [null, response];
  } catch (error) {
    console.log(error);
    return [error.response.statusText, null];
  }
}

export async function sendUpdate(status, message, issueId, email) {
  const response = await axios.post(`/api/statusChanges`, {
    statusChange: {
      status: status,
      message: message,
      issueId: issueId,
      email: email,
    },
  });

  return response.data.newChange;
}

export async function sendDeleteRequest(issueId) {
  return await axios.delete(`/api/issues/${issueId}`);
}

export async function sendSolvedUpdateRequest(issueId, email) {
  const response = await axios.post(`/api/statusChanges`, {
    statusChange: {
      status: "Solved",
      message: "Issue solved",
      issueId: issueId,
      email: email,
    },
  });

  return response.data.newChange;
}
