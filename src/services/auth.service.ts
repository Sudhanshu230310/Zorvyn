import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { AppError } from '../utils/errors';
import { Role } from '@prisma/client';

export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return this.generateToken(user);
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.isActive) {
      throw new AppError('Invalid credentials or inactive account', 401);
    }

    const isMatch = await bcryptjs.compare(data.password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials or inactive account', 401);
    }
    return this.generateToken(user);
  }

  private static generateToken(user: { id: string; role: Role }) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return { token, user: { id: user.id, role: user.role } };
  }
}
