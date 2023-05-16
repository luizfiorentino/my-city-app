import prisma from "@/prisma/client";
import { NextApiHandler, NextApiResponse } from "next";

export default async function handler(req, res) {
  console.log("REQ BODY->", req.body);

  // const issueId = req.query.id;
  const issueId = req.query.issueId;
  console.log("from handler", issueId);

  if (req.method === "DELETE") {
    await prisma.statusChange.deleteMany({ where: { issueId: issueId } });
    const issueDelete = await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });
    return res.status(200).json({ issueDelete });
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not supported` });
  }
}
