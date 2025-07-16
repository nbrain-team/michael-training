import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getPrismaClient } from '../config/database';

export class UserRepository {
  private prisma = getPrismaClient();

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    title: string;
    role?: 'EXECUTIVE' | 'ADMIN' | 'COACH';
  }): Promise<User> {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        subscription: {
          create: {
            plan: 'FREE',
            status: 'ACTIVE',
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          }
        },
        preferences: {
          create: {
            timezone: 'UTC',
            focusAreas: []
          }
        },
        analytics: {
          create: {}
        }
      },
      include: {
        subscription: true,
        preferences: true,
        analytics: true
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        subscription: true,
        preferences: true,
        analytics: true,
        goals: {
          include: {
            kpis: true
          }
        }
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        preferences: true,
        analytics: true,
        goals: {
          include: {
            kpis: true
          }
        }
      }
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        subscription: true,
        preferences: true,
        analytics: true
      }
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.prisma.userAnalytics.update({
      where: { userId: id },
      data: {
        lastLogin: new Date(),
        totalSessions: { increment: 1 }
      }
    });
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }
}

// Export a singleton instance
export const userRepository = new UserRepository(); 