import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class DashboardService {
  static async getSummary(filters: { startDate?: string; endDate?: string }) {
    const where: Prisma.RecordWhereInput = {};
    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }

    const records = await prisma.record.findMany({ where });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals: Record<string, number> = {};

    for (const record of records) {
      if (record.type === 'INCOME') {
        totalIncome += record.amount;
      } else {
        totalExpense += record.amount;
      }

      if (!categoryTotals[record.category]) {
        categoryTotals[record.category] = 0;
      }
      categoryTotals[record.category] += record.amount;
    }

    // Recent activity
    const recentActivity = await prisma.record.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 5,
    });

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recentActivity,
    };
  }
}
