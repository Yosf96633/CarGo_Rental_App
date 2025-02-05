import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import bcryptjs from "bcryptjs";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: `credential`,
      credentials: {
        email: { label: `Email`, placeholder: `Email`, type: "email" },
        password: {
          label: `Password`,
          placeholder: `Password`,
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await dbConnect();
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error(`Please enter valid credentials`);
          }
          const user = await userModel.findOne({ email: credentials.email });
          if (!user) {
            throw new Error(`User not found. Please enter correct credentials`);
          }
          if (!user.isVerified) {
            throw new Error(`Please verify your account first`);
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error(`Invalid credentials`);
          }
          const { username, email, role, profileImage, address, isVerified } =
            user;
          return {
            username,
            email,
            role,
            profileImage,
            address,
            isVerified,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user , account}) {
      if (user) {
        (token.username = user.username),
          (token.email = user.email),
          (token.role = user.role),
          (token.address = user.address),
          (token._id = user._id?.toString()),
          (token.isVerified = account?.provider === "google" ? true : user.isVerified);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user._id = token._id),
          (session.user.username = token.username),
          (session.user.email = token.email),
          (session.user.role = token.role),
          (session.user.isVerified = token.isVerified),
          (session.user.profileImage = token.profileImage);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
