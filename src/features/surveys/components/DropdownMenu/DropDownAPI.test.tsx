import { getUserName } from 'pages/api/survey/users/[id]';
import { createTestPrismaClient, closeTestPrismaClient } from 'features/surveys/components/DropDownMenu/TestHelpers';
import { PrismaClient } from '@prisma/client';
let prisma: PrismaClient;

beforeAll(() => {
  prisma = createTestPrismaClient();
});

afterAll(async () => {
  await closeTestPrismaClient(prisma);
});

describe('getUserName', () => {
  let testUserId: string;

  beforeEach(async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        emailVerified: null,
        hashedPassword: 'hashedpassword',
        image: 'path/to/image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    if (testUserId) {
      await prisma.user.delete({
        where: {
          id: testUserId,
        },
      });
    }
  });

  it('returns null for null userId', async () => {
    const result = await getUserName(null);
    expect(result).toEqual('');
  });

  it('returns user name for a valid userId', async () => {
    const result = await getUserName(testUserId);
    expect(result).toBe('John Doe');
  });
});