// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/prisma/client";
const multer = require("multer");

const fs = require("fs");
const { cloudinary } = require("./utils/cloudinary");

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve, reject) => {
      upload.single("file")(req, res, async (error) => {
        if (error) {
          console.error("Error uploading file:", error);
          return reject(res.status(500).send("Error uploading file"));
        }

        if (!req.file) {
          return reject(res.status(400).send("No file uploaded"));
        }

        const { userName, description, location } = req.body;
        const path = req.file.path;
        console.log("PATH::", path);

        const folder = "react_cloudinary"; // Specify the folder name here

        cloudinary.uploader.upload(
          path,
          { folder: folder },
          async (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary", error);
              return reject(res.status(500).send("Error uploading file"));
            }
            fs.unlinkSync(path);
            const imageUrl = result.secure_url;
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
                },
              });

              resolve(
                res
                  .status(200)
                  .json({ message: "Issue created successfully", newIssue })
              );
            } catch (error) {
              console.error("Error creating issue:", error);
              reject(res.status(500).send("Error creating issue"));
            }
          }
        );
      });
    });
  }
}
// const session = await getServerSession(req, res, authOptions);

// if (req.method === "GET") {
//   if (!session) {
//     return res.status(401).end();
//   }

//   const issues = await prisma.issue.findMany();

//   if (!issues) {
//     return res.status(404).end();
//   }

//   return res.status(200).json({ issues });
// }

// if (req.method === "POST") {
//   const newIssue = await prisma.issue.create({
//     data: {
//       userName: req.body.issue.userName,
//       description: req.body.issue.description,
//       location: req.body.issue.location,
//       statusChange: {
//         create: [
//           {
//             status: "Submitted",
//             message: "first update",
//           },
//         ],
//       },
//     },
//   });

//   return res
//     .status(201)
//     .json({ message: `New issue placed`, newIssue: newIssue });
// } else {
//   res.status(405).end();
// }

//Confirm we're not using DELETE here!
// if (req.method === "DELETE") {
//   const issueDelete = await prisma.issue.delete({
//     where: {
//       id: req.body.object.id,
//     },
//   });
//   return res.status(200).json({ issueDelete });
// } else {
//   return res
//     .status(405)
//     .json({ message: `Method ${req.method} not supported` });
// }

// } else {
//   res.status(405).end();
// }

//Maybe use as reference?
// if (session) {
//   // Signed in
//   console.log("Session", JSON.stringify(session, null, 2));
// } else {
//   // Not Signed in
//   res.status(401);
// }
// res.end();
