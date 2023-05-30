import Head from "next/head";
import { Inter } from "next/font/google";
import AdminList from "@/components/Admin/List/AdminList";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import IssueContext from "@/utils/IssueContext";

import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ issues }) {
  const { data: session } = useSession();
  const context = useContext(IssueContext);

  context.setSignedInAs(session);
  //console.log("session", session);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="og:description"
          content="Submit an issue to the Municipality"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <h4 style={{ display: "flex", justifyContent: "center" }}>
          Signed in as{" "}
          <span style={{ fontStyle: "italic", marginLeft: "5px" }}>
            {" "}
            {session?.user?.email}
          </span>
        </h4> */}

        <AdminList data={issues} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        statusChange: {
          // here, include only the last status
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return {
      props: {
        issues: serialize(issues),
      },
    };
  } catch (e) {
    console.log("db error:", e);
  }
}
