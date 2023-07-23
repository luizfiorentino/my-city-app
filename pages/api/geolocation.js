import fetch from "node-fetch";

const apiKey = process.env.OPENCAGE_API_KEY;
console.log("API key?", apiKey);
const rateLimitWindowMs = 60000;
const maxRequestsPerWindow = 100;
const rateLimits = new Map();
const allowedDomains = [
  "https://my-city-app.vercel.app",

  "https://my-city-app-git-main-luizfiorentino.vercel.app",
  "my-city-b8wyox4gh-luizfiorentino.vercel.app",
  "my-city-app-git-main-luizfiorentino.vercel.app",
  "my-city-b8wyox4gh-luizfiorentino.vercel.app",

  "http://localhost:3000",
];

export default async function handler(req, res) {
  const { latitude, longitude } = req.query;

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}&pretty=1`;
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const domain = req.headers["x-domain-header"];

  // Check if the referer is in the allowed domains
  if (!allowedDomains.includes(domain)) {
    res.status(403).json({ error: "Access denied. Invalid domain." });
    return;
  }

  // Check if the user has exceeded the maximum requests per window
  const rateLimit = rateLimits.get(ipAddress) || {
    requests: 0,
    lastRequestTime: Date.now(),
  };
  const currentTime = Date.now();

  if (
    rateLimit.requests >= maxRequestsPerWindow &&
    currentTime - rateLimit.lastRequestTime < rateLimitWindowMs
  ) {
    const timeLeft =
      rateLimitWindowMs - (currentTime - rateLimit.lastRequestTime);
    res
      .status(429)
      .json({ error: "Too many requests. Please try again later.", timeLeft });
    return;
  }

  // Update the rate limit for the user
  rateLimits.set(ipAddress, {
    requests: rateLimit.requests + 1,
    lastRequestTime: currentTime,
  });

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("/api/geolocation handler, response", response);

    if (data.results.length > 0) {
      const address = data.results[0].formatted;
      res.json({ address });
    } else {
      res.status(404).json({
        error:
          "(api/geolocation handler)No address found for the given coordinates.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
}
