import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcryptjs.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.local' },
    update: {},
    create: {
      email: 'admin@test.local',
      name: 'System Admin',
      password,
      role: 'ADMIN',
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@test.local' },
    update: {},
    create: {
      email: 'analyst@test.local',
      name: 'Finance Analyst',
      password,
      role: 'ANALYST',
    },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@test.local' },
    update: {},
    create: {
      email: 'viewer@test.local',
      name: 'Dashboard Viewer',
      password,
      role: 'VIEWER',
    },
  });

  // Create some sample records
  await prisma.record.createMany({
    data: [
      { amount: 5000, type: 'INCOME', category: 'Salary', date: new Date(), notes: 'Monthly salary', userId: admin.id },
      { amount: 1500, type: 'EXPENSE', category: 'Rent', date: new Date(), notes: 'Office Rent', userId: admin.id },
      { amount: 300, type: 'EXPENSE', category: 'Utilities', date: new Date(), notes: 'Electricity & Water', userId: admin.id },
      { amount: 10000, type: 'INCOME', category: 'Sales', date: new Date(), notes: 'Q1 Product Sales', userId: analyst.id },
      { amount: 2000, type: 'EXPENSE', category: 'Marketing', date: new Date(), notes: 'Ad spend', userId: analyst.id },
    ]
  });

  console.log('Seeded database with initial users and records!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
