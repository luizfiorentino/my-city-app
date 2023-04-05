import React from "react";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";

export default function IssueStatus({ issue }) {
  // const router = useRouter();
  // const id = router.asPath.substring(14);
  console.log("issue det page top", issue);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: context.params.issueId,
      },
    });

    return { props: { issue: serialize(issue) } };
  } catch (e) {
    console.log("db error:", e);
  }
}
