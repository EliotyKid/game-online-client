import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import db from "./db"
import Discord from "next-auth/providers/discord"

const adapter = PrismaAdapter(db)
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [Google, Discord],
})