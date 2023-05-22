// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/prisma/client";

export default async function handler(req, res) {
  console.log("REQ BODY->", req.body);
  if (req.method === "GET") {
    const issues = await prisma.issue.findMany();
    return res.status(200).json({ issues });
  }
  if (req.method === "POST") {
    const newIssue = await prisma.issue.create({
      data: {
        userName: req.body.issue.userName,
        description: req.body.issue.description,
        location: req.body.issue.location,
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

    return res
      .status(201)
      .json({ message: `New issue placed`, newIssue: newIssue });
  }
  if (req.method === "DELETE") {
    const issueDelete = await prisma.issue.delete({
      where: {
        id: req.body.object.id,
      },
    });
    return res.status(200).json({ issueDelete });
  }
  // if (req.method === "DELETE") {
  //   console.log("ISSUE ID API", req.body);
  //   const deletedIssue = await prisma.issue.delete({
  //     where: {
  //       id: req.body.issueId.issueId,
  //     },
  //   });
  else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not supported` });
  }
}
