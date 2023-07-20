import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const changes = await prisma.statusChange.findMany();
    if (!changes) {
      return res.status(404).end();
    }
    return res.status(200).json({ changes });
  }

  if (req.method === "POST") {
    const status = req.body.statusChange.status;
    const message = req.body.statusChange.message;
    const issueId = req.body.statusChange.issueId;
    const email = req.body.statusChange.email;

    const issue = await prisma.issue.findUnique({
      where: { id: req.body.statusChange.issueId },
    });

    if (!issue) {
      console.log("Issue not found");
      return res.status(404).end();
    }
    const newChange = await prisma.statusChange.create({
      data: {
        status,
        message,
        issueId,
      },
    });
    console.log("New update created");

    if (!email) {
      console.log("Issue placed with no email sent");
      return res.status(201).json({
        message: `New change placed without sending email`,
        newChange: newChange,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const subject = "Subject: My City App Notification";
    const text = `Your Issue Status: ${status}`;
    const html = `
        <h2>Dear user</h2>
        <h3>There is an update in your posted issue id AMS${issueId}!</h3>
        <h3>Current Status: ${status}</h3>
        <h3>Message: ${message}</h3>
       <p>Thanks for using My City App! </p>
       <p>Please note this is a non-reply email.</p>
      `;

    const mailOptions = {
      from: "my-city-app@update-user.com",
      to: email,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result);

    return res
      .status(201)
      .json({ message: `New change placed`, newChange: newChange });
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not supported` });
  }
}

// Obs. Alternative example how to configure SMTP configs
//   host: 'smtp.example.com', // SMTP server hostname
//   port: 587, // SMTP server port
//   secure: false, // Set to true if using a secure connection (e.g., TLS/SSL)
//   auth: {
//     user: 'your-username', // SMTP username
//     pass: 'your-password', // SMTP password
// });
