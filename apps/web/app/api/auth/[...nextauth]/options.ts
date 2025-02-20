import { AUTH_USER } from "@/lib/apiAuthRoutes";
import { Account, AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${AUTH_USER}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.error);

          if (data) {
            const user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.profilePic,
              token: data.user.token,
            };
            return user;
          } else {
            return null;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          throw new Error(error.message);
        }
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
      if (account?.provider === "google") {
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
          console.log("user:", user);
          console.log("outh:", data);
          user.id = data?.user.id;
          user.token = data?.user.token;
          return true;
        } catch (error) {
          console.log("The user data is", error);
          console.log("The user data is", user);
          console.log("The user data is", account);
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true; // Simply allow sign-in for credentials
      }

      return false; // Default case: deny sign-in
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
