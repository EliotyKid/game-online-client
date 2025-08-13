import { PrismaClient } from "@prisma/client";

const prismaClientsingleton = () => {
  return new PrismaClient();
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientsingleton>
}& typeof global

const db = globalThis.prismaGlobal ?? prismaClientsingleton();

export default db;

if ( process.env.NODE_ENV !== "production" ) globalThis.prismaGlobal = db;