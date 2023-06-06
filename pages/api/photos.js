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
  //console.log(await req.formData());
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Error uploading file", err);
        return res.status(500).send("Error uploading file");
      }

      console.log(":::::REQUEST File:", req.file); // Log the req.body object

      if (!req.file) return res.status(400).send("No file uploaded");

      const path = req.file.path;
      console.log("PATH:::", path);
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
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     console.log(":::::REQUEST BODY:", req.body); // Log the req.body object

//     if (!req.file) return res.status(400).send("No file uploaded");

//     const path = req.file.path;
//     const folder = "react_cloudinary"; // Specify the folder name here

//     cloudinary.uploader.upload(
//       path,
//       { folder: "react_cloudinary" },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary", error);
//           return res.status(500).send("Error uploading image");
//         }

//         fs.unlinkSync(path);
//         const imageUrl = result.secure_url;

//         // do something with the imageUrl, like save to DB
//         return res.status(200).json({ imageUrl });
//       }
//     );
//   } else {
//     res.status(405).end();
//   }
// }

// const cloudinary = require("cloudinary").v2;

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     console.log("::::BACKENDREQUEST:", req.body);
//     if (!req.file) return res.status(400).send("No file uploaded");

//     const path = req.file.path;
//     const folder = "react_cloudinary"; // Specify the folder name here

//     cloudinary.uploader.upload(
//       path,
//       { folder: "react_cloudinary" },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary", error);
//           return res.status(500).send("Error uploading image");
//         }

//         fs.unlinkSync(path);
//         const imageUrl = result.secure_url;

//         // do something with the imageUrl, like save to DB
//         return res.status(200).json({ imageUrl });
//       }
//     );
//   } else {
//     res.status(405).end();
//   }
// }
// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// // const cloudinary = require("fs");

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     upload.single("image")(req, res, (err) => {
//       if (err) {
//         console.error("Error uploading file", err);
//         return res.status(500).send("Error uploading image");
//       }

//       if (!req.file) return res.status(400).send("No file uploaded");

//       const path = req.file.path;
//       const folder = "react_cloudinary"; // Specify the folder name here

//       cloudinary.uploader.upload(path, { folder: folder }, (error, result) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary", error);
//           return res.status(500).send("Error uploading image");
//         }

//         fs.unlinkSync(path);
//         const imageUrl = result.secure_url;

//         // do something with the imageUrl, like save to DB
//         return res.status(200).json({ imageUrl });
//       });
//     });
//   } else {
//     res.status(405).end();
//   }
// }

// // import prisma from "@/prisma/client";
// // const { cloudinary } = require("./utils/cloudinary");

// // export default async function handler(req, res) {
// //   console.log("clodi", cloudinary);
// //   if (req.method === "POST") {
// //     if (!req.file) res.status(400).send("No file uploaded");
// //     const path = req.file.path;
// //     const folder = "react_cloudinary"; // Specify the folder name here
// //     cloudinary.uploader.upload(
// //       path,
// //       { folder: "react_cloudinary" },
// //       (error, result) => {
// //         if (error) {
// //           console.error("Error uploading to Cloudinary", error);
// //           return res.status(500).send("Error uploading image");
// //         }
// //         fs.unlinkSync(path);
// //         const imageUrl = result.secure_url;

// //         // do something with the imageUrl, like save to DB
// //         return res.status(200).json({ imageUrl });
// //       }
// //     );

// //     return res
// //       .status(201)
// //       .json({ message: `New issue placed`, newIssue: newIssue });
// //   } else {
// //     res.status(405).end();
// //   }
// // }
