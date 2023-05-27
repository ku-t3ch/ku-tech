import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    picture: string;
    sub: string;
    iss: string;
    azp: string;
    aud: string;
    hd: string;
    email_verified: boolean;
    at_hash: string;
    given_name: string;
    family_name: string;
    locale: string;
    isCoreTeam: boolean;
    iat: number;
    exp: number;
    jti: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      picture: string;
      sub: string;
      iss: string;
      azp: string;
      aud: string;
      hd: string;
      email_verified: boolean;
      at_hash: string;
      given_name: string;
      family_name: string;
      locale: string;
      isCoreTeam: boolean;
      iat: number;
      exp: number;
      jti: string;
    };
  }

  interface User {
    name: string;
    email: string;
    picture: string;
    sub: string;
    iss: string;
    azp: string;
    aud: string;
    hd: string;
    email_verified: boolean;
    at_hash: string;
    given_name: string;
    family_name: string;
    locale: string;
    isCoreTeam: boolean;
    iat: number;
    exp: number;
    jti: string;
  }
}
export const authOptions: NextAuthOptions = {
  callbacks: {
    session(session) {
      session.session.user = session.token as any;
      if (session.token.exp < Date.now() / 1000) {
        return {} as any;
      }
      return session.session;
    },
    async jwt({ token, user, profile }) {
      const userData = await prisma.request.findUnique({
        where: {
          email: token.email,
        },
        include: {
          tags: {
            select: {
              tag_type: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const isCoreTeam =
        userData?.tags.filter((tag) => tag.tag_type?.name === "core-team")
          .length! > 0 || false;
      return { ...token, ...profile, isCoreTeam };
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
