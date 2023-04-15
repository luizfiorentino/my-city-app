import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const changes = await prisma.statusChange.findMany();
    return res.status(200).json({ changes });
  }
  if (req.method === "POST") {
    console.log("from status changes REQ BODY->", req.body.statusChange);
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
