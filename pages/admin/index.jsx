import Head from "next/head";
import { Inter } from "next/font/google";
import AdminList from "@/components/adminList/AdminList";
import prisma from "@/prisma/client";
import serialize from "@/utils/serialize";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ issues }) {
  const reports = issues.map((issue) => issue.description);
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
        <h1>My city app</h1> <AdminList data={issues} issues={reports} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const issues = await prisma.issue.findMany();
  return { props: { issues: serialize(issues) } };
}
