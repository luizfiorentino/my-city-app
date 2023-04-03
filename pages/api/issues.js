// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const issues = await prisma.issue.findMany();
    return res.status(200).json({ issues });
  }
  if (req.method === "POST") {
    console.log("REQ BODY->", req.body.issue);
    const newIssue = await prisma.issue.create({
      data: {
        userName: req.body.issue.userName,
        description: req.body.issue.description,
        location: req.body.issue.location,
      },
    });

    return res
      .status(201)
      .json({ message: `New issue placed`, newIssue: newIssue });
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not supported` });
  }
}
