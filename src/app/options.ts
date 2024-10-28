import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt";
import dayjs from "dayjs";

async function refreshAccessToken(token: JWT) {
  const res = await sendRequest<IBackendRes<JWT>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
    method: "POST",
    body: { refresh_token: token?.refresh_token },
  });

  if (res.data) {
    return {
      ...token,
      access_token: res.data?.access_token ?? "",
      refresh_token: res.data?.refresh_token ?? "",
      access_expire: dayjs(new Date())
        .add(+(process.env.TOKEN_EXPIRE_NUMBER as string), process.env.TOKEN_EXPIRE_UNIT as any)
        .unix(),
      error: "",
    };
  } else {
    //failed to refresh token => do nothing
    return {
      ...token,
      error: "RefreshAccessTokenError", // This is used in the front-end, and if present, we can force a re-login, or similar
    };
  }
}

export const options: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Personal Finance",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          method: "POST",
          body: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        if (res && res.data) {
          // Any object returned will be saved in `user` property of the JWT
          return res.data as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error(res?.message as string);

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    // Specify the custom error page
    error: "/auth/login", // Redirect to /auth/login on error
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social-media`,
          method: "POST",
          body: { type: account?.provider?.toLocaleLowerCase(), email: user.email, name: user.name },
        });
        if (res.data) {
          token.access_token = res.data?.access_token;
          token.refresh_token = res.data.refresh_token;
          token.user = res.data.user;
          token.access_expire = dayjs(new Date())
            .add(+(process.env.TOKEN_EXPIRE_NUMBER as string), process.env.TOKEN_EXPIRE_UNIT as any)
            .unix();
        } else {
          token.error = "OAuthCallback";
          return token;
          //  (res?.message as string);
        }
      }
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.refresh_token = user.refresh_token;
        //@ts-ignore
        token.user = user.user;
        //
        token.access_expire = dayjs(new Date())
          .add(+(process.env.TOKEN_EXPIRE_NUMBER as string), process.env.TOKEN_EXPIRE_UNIT as any)
          .unix();
      }

      const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number) ?? 0));

      if (isTimeAfter) {
        return refreshAccessToken(token);
      }

      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
        session.access_expire = token.access_expire;
        session.error = token.error;
      }

      return session;
    },
  },
};
