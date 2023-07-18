import fetch from "node-fetch";

const apiKey = process.env.OPENCAGE_API_KEY;

export default async function handler(req, res) {
  const { latitude, longitude } = req.query;

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}&pretty=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results.length > 0) {
      const address = data.results[0].formatted;
      res.json({ address });
    } else {
      res
        .status(404)
        .json({ error: "No address found for the given coordinates." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
}
