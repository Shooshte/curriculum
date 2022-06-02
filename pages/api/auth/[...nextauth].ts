import NextAuth from "next-auth";
import { Neo4jAdapter } from "@next-auth/neo4j-adapter";
import GoogleProvider from "next-auth/providers/google";

import { session } from "../../../lib/db/driver";

import { withSentry } from "@sentry/nextjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Neo4jAdapter(session),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export default withSentry(handler);
