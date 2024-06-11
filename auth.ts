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
    Google({
      async profile(profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (existingUser) {
          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            image: existingUser.image,
            role: existingUser.role,
          };
        }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER", // Default role
        };
      }
    })
  ],
  callbacks: {
   session({ session, user }) {
      session.user.role = user.role
      return session
      
    }
    
  }
})