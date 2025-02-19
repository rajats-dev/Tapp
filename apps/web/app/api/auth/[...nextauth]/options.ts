import { AUTH_USER } from "@/lib/apiAuthRoutes";
import { Account, AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 6000, // Increase timeout to 10 seconds
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          name: user.name,
          email: user.email,
          provider: account?.provider,
          oauth_id: account?.providerAccountId,
          profilePic: user?.image,
        };

        const res = await fetch(`${AUTH_USER}/outhLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        user.id = data?.user.id;
        user.token = data?.user.token;
        return true;
      } catch (error) {
        console.log("The user data is", error);
        console.log("The user data is", user);
        console.log("The user data is", account);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};
