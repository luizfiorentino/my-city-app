import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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
    const newChange = await prisma.statusChange.create({
      data: {
        status: req.body.statusChange.status,
        message: req.body.statusChange.message,
        issueId: req.body.statusChange.issueId,
      },
    });

    return res
      .status(201)
      .json({ message: `New change placed`, newChange: newChange });
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not supported` });
  }
}
