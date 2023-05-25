import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
//This one we dont kknow yet if necessary
//import Adapters from "next-auth/adapters";
//This one
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    //alternativelly Providers.GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ...add more providers here
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM, // The "from" address that you want to use
    }),
  ],
  adapter: PrismaAdapter(prisma),
  //   adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};
export default NextAuth(authOptions);
//Maybe to use later
// const authHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;
