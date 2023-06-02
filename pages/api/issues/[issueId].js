import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const issueId = req.query.issueId;

  const session = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).end();
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!issue) {
      return res.status(404).end();
    }

    const deletedChanges = await prisma.statusChange.deleteMany({
      where: { issueId: issueId },
    });

    const issueDelete = await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });

    return res.status(200).json({ issueDelete });
  } else {
    res.status(405).end();
  }
}

//Maybe used as reference?
//  //console.log("Session", JSON.stringify(session, null, 2));
