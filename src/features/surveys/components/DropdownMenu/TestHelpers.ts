import { PrismaClient } from '@prisma/client';

export function createTestPrismaClient(): PrismaClient {
  return new PrismaClient();
}

export async function closeTestPrismaClient(prisma: PrismaClient): Promise<void> {
  await prisma.$disconnect();
}