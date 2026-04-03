import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // You need passed db connection strings if required
});

export default prisma;
