// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/client";
import multer from "multer";
import fs from "fs";
import { cloudinary } from "../utils/cloudinary";

const processMultipartForm = multer({ dest: "/tmp" });

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

async function insertNewIssue(
  userName,
  description,
  location,
  latitude,
  longitude,
  images
) {
  try {
    const newIssue = await prisma.issue.create({
      data: {
        userName,
        description,
        location,
        latitude,
        longitude,
        statusChange: {
          create: [
            {
              status: "Submitted",
              message: "first update",
            },
          ],
        },
        images: {
          create: images,
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
    console.log("REQ BODY", req.body);
    return new Promise((resolve, reject) => {
      processMultipartForm.array("file", 3)(req, res, async (multerError) => {
        if (multerError) {
          console.error("Error uploading file with multer:", multerError);
          return reject(res.status(500).send("Error uploading file"));
        }

        if (!req.files) {
          return reject(res.status(400).send("No file uploaded"));
        }

        const fileUploadPromises = req.files.map((file) => {
          const path = file.path;
          const folder = "react_cloudinary"; // Cloudinary folder name

          return uploadSingleImage(path, folder);
        });

        const cloudinaryResponses = await Promise.all(fileUploadPromises);

        const images = cloudinaryResponses.map(([cloudinaryError, image]) => {
          if (cloudinaryError) {
            console.error("Error uploading to cloudinary", cloudinaryError);
          }

          return { url: image.secure_url };
        });

        console.log("URLS?", images);

        //remove symbolic links from file system
        req.files.forEach((file) => {
          const path = file.path;
          fs.unlinkSync(path);
        });

        //This is after multer process
        const { userName, description, location, latitude, longitude } =
          req.body;
        console.log("REQ BODY@", req.body);

        const [databaseError, newIssue] = await insertNewIssue(
          userName,
          description,
          location,
          parseFloat(latitude),
          parseFloat(longitude),
          images
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
