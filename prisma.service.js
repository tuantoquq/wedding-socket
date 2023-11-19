import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma;
}
