import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth";

const prisma = new PrismaClient();

export const auth = betterAuth({
  // We use a function to properly initialize the adapter
  database: () => prismaAdapter(prisma),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
  ],
});