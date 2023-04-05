import React from "react";
import { useRouter } from "next/router";
//import prisma from "@/prisma/client";

export default function IssueStatus({ issues }) {
  //   const router = useRouter();
  //   const id = router.asPath;
  //console.log("issue det page", issues);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const router = useRouter();
    const id = router.asPath;
    console.log("id-->", id);
    const issue = await prisma.issue.findUnique({
      where: {
        id: id,
      },
    });
    return { props: { issue: serialize(issue) } };
  } catch (e) {
    console.log("db error:", e);
  }
}

// export async function getServerSideProps() {
//   try {
//     const issues = await prisma.issue.findMany();
//     return { props: { issues: serialize(issues) } };
//   } catch (e) {
//     console.log("db error:", e);
//   }
// }
