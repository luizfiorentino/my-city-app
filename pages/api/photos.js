const { cloudinary } = require("./utils/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Error uploading file", err);
        return res.status(500).send("Error uploading file");
      }

      if (!req.file) return res.status(400).send("No file uploaded");

      const path = req.file.path;

      const folder = "react_cloudinary"; // Specify the folder name here

      cloudinary.uploader.upload(path, { folder: folder }, (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary", error);
          return res.status(500).send("Error uploading image");
        }

        fs.unlinkSync(path);
        const imageUrl = result.secure_url;

        // do something with the imageUrl, like save to DB
        return res.status(200).json({ imageUrl });
      });
    });
  } else {
    res.status(405).end();
  }
}
