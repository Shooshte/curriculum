import NextAuth from "next-auth";
import neo4j from "neo4j-driver";
import { Neo4jAdapter } from "@next-auth/neo4j-adapter";
import GoogleProvider from "next-auth/providers/google";

import { withSentry } from "@sentry/nextjs";

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS)
);

const neo4jSession = driver.session();

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
  adapter: Neo4jAdapter(neo4jSession),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export default handler;
