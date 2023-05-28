import { PrismaClient } from '@prisma/client';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prismadb: PrismaClient;
  }
}
