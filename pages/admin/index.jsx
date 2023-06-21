import Head from "next/head";
import { Inter } from "next/font/google";
import AdminList from "@/components/Admin/List/AdminList";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ issues }) {
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
