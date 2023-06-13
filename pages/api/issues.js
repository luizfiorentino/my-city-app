// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/client";
import multer from "multer";
import fs from "fs";
import { cloudinary } from "./utils/cloudinary";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadSingleImage(path, folder) {
  try {
    const response = await cloudinary.uploader.upload(path, { folder: folder });
    console.log("RES?", response);
    return [null, response];
  } catch (error) {
    console.log("ERROR?", error);
    return [error, null];
  }
}

async function insertNewIssue(userName, description, location, imageUrl) {
  try {
    const newIssue = await prisma.issue.create({
      data: {
        userName,
        description,
        location,
        statusChange: {
          create: [
            {
              status: "Submitted",
              message: "first update",
            },
          ],
        },
        images: {
          create: [
            {
              url: imageUrl,
            },
          ],
        },
      },
    });
    return [null, newIssue];
  } catch (error) {
    return [error, null];
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve, reject) => {
      upload.single("file")(req, res, async (multerError) => {
        if (multerError) {
          console.error("Error uploading file with multer:", multerError);
          return reject(res.status(500).send("Error uploading file"));
        }

        if (!req.file) {
          return reject(res.status(400).send("No file uploaded"));
        }

        const path = req.file.path;
        const folder = "react_cloudinary"; // Cloudinary folder name

        const [cloudinaryError, image] = await uploadSingleImage(path, folder);

        if (cloudinaryError) {
          console.error("Error uploading to Cloudinary", cloudinaryError);
          return reject(res.status(500).send("Error uploading file"));
        }
        //remove symbolic link from file system
        fs.unlinkSync(path);

        const imageUrl = image.secure_url;
        const { userName, description, location } = req.body;

        const [databaseError, newIssue] = await insertNewIssue(
          userName,
          description,
          location,
          imageUrl
        );

        if (databaseError) {
          console.log("Error during insertion into database:", databaseError);
          return reject(res.status(500).send("Error creating issue"));
        }

        return resolve(
          res
            .status(200)
            .json({ message: "Issue created successfully", newIssue })
        );
      });
    });
  }
}
