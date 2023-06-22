import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { text, html } from "./utils";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },

      from: process.env.SMTP_FROM,
      async sendVerificationRequest({ identifier, url, provider, theme }) {
        const response = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
        });
        if (!response) {
          console.log("admin account not found");

          throw new Error("email not found");
        }

        const { host } = new URL(url);

        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);

        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }

        html({ url, host, theme });
        text({ url, host });
      },
    }),

    {},
  ],
  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt", // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)
  },
};
export default NextAuth(authOptions);

// For creating new users, we can enable Github provider like this:

// import GithubProvider from "next-auth/providers/github";
// (...)
// GithubProvider({
//   clientId: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET,
// }),
