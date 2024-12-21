import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();

declare module "next-auth"{
  interface Session {
    user:{
      role: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({}),
  ],
  callbacks: {
      async signIn({ user, account, profile }) {

        if (!account) {
          console.error("Account object is null or undefined");
          return false; // Reject sign-in
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });
      
        if (!existingUser) {
          // Create a new user and link the account
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              role: "USER",
              accounts: {
                create: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                },
              },
            },
          });
        } else {
          // Ensure the account is linked
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
            },
          });

          if (!existingAccount) {
            // Link the account to the existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token || null,
                refresh_token: account.refresh_token || null,
                expires_at: account.expires_at || null,
              },
            });
          }
        }
      
        return true; // Allow sign-in
      }
      
    
    }
})