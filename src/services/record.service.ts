import prisma from '../utils/prisma';
import { AppError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export class RecordService {
  static async create(data: any, userId: string) {
    return prisma.record.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  static async findById(id: string) {
    const record = await prisma.record.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!record) throw new AppError('Record not found', 404);
    return record;
  }

  static async findAll(filters: { startDate?: string; endDate?: string; category?: string; type?: any }) {
    const where: Prisma.RecordWhereInput = {};
    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }
    if (filters.category) where.category = filters.category;
    if (filters.type) where.type = filters.type;

    return prisma.record.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  static async update(id: string, data: any) {
    const record = await prisma.record.findUnique({ where: { id } });
    if (!record) throw new AppError('Record not found', 404);

    return prisma.record.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    const record = await prisma.record.findUnique({ where: { id } });
    if (!record) throw new AppError('Record not found', 404);

    return prisma.record.delete({ where: { id } });
  }
}
