import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (
          credentials?.username === "user" &&
          credentials.password === "user"
        ) {
          return {
            id: 2,
            name: "User",
            address: "Malang",
            title: "FE Engineer",
            accessToken: "abc123qwert",
          };
        }
        //Login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, profile }) => {
      if (user) {
        token = {
          ...token,
          name: user?.name,
          address: user?.address,
          title: user?.title,
          accessToken: user?.accessToken,
        };
      }
      return token;
    },
    session: ({ token, session }: any) => {
      if (token) {
        session.id = token.id;
        session.user.address = token.address;
        session.user.title = token.title;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: "secretKey",
  jwt: {
    secret: "secretKey",
  },
});
