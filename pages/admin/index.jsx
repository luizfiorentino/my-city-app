import Head from "next/head";
import { Inter } from "next/font/google";
import AdminList from "@/components/Admin/List/AdminList";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";
import { all } from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ issues, statusUpdates }) {
  const reports = issues.map((issue) => issue.description);
  console.log("issues=>", issues);
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
        <AdminList data={issues} issues={reports} updates={statusUpdates} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const issues = await prisma.issue.findMany();
    const allUpdates = await prisma.statusChange.findMany();
    const statusUpdates = allUpdates.map((update) => {
      return serialize(update);
    });

    return { props: { issues: serialize(issues), statusUpdates } };
  } catch (e) {
    console.log("db error:", e);
  }
}
