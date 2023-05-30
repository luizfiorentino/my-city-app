import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
//This one we dont kknow yet if necessary
//import Adapters from "next-auth/adapters";
//This one
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

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
      from: process.env.SMTP_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        return async function sendVerificationRequest({
          identifier,
          url,
          provider,
          theme,
        }) {
          const { host } = new URL(url);
          // NOTE: You are not required to use `nodemailer`, use whatever you want.
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
            throw new Error(
              `Email(s) (${failed.join(", ")}) could not be sent`
            );
          }
        };

        function html({ url, host, theme }) {
          //const { url, host, theme } = params;

          const escapedHost = host.replace(/\./g, "&#8203;.");

          const brandColor = theme.brandColor || "#346df1";
          const color = {
            background: "#f9f9f9",
            text: "#444",
            mainBackground: "#fff",
            buttonBackground: brandColor,
            buttonBorder: brandColor,
            buttonText: theme.buttonText || "#fff",
          };

          return `
          <body style="background: ${color.background};">
            <table width="100%" border="0" cellspacing="20" cellpadding="0"
              style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
              <tr>
                <td align="center"
                  style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                  Sign in to <strong>${escapedHost}</strong>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                          target="_blank"
                          style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                          in</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center"
                  style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                  If you did not request this email ::::::: you can safely ignore it.
                </td>
              </tr>
            </table>
          </body>
          `;
        }

        /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
        function text({ url, host }) {
          return `Sign in to ${host}\n${url}\n\n`;
        }
      },

      // The "from" address that you want to use
    }),
    {},
  ],
  adapter: PrismaAdapter(prisma),
  //   adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.NEXTAUTH_SECRET,
  //secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)
  },
};
export default NextAuth(authOptions);
//Maybe to use later
// const authHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;
