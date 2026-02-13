import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@hrms.com',
        password,
        role: 'ADMIN'
      },
      {
        name: 'HR User',
        email: 'hr@hrms.com',
        password,
        role: 'HR'
      },
      {
        name: 'Employee User',
        email: 'employee@hrms.com',
        password,
        role: 'EMPLOYEE'
      }
    ]
  });

  await prisma.department.createMany({
    data: [
      { name: 'Engineering' },
      { name: 'HR' },
      { name: 'Finance' }
    ]
  });
}

main()
  .then(() => console.log('🌱 Database seeded'))
  .finally(() => prisma.$disconnect());
