import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;
async function main() {
  // create two dummy articles
  const tenant = await prisma.tenants.upsert({
    where: { key: 'Demo tenant' },
    update: {},
    create: {
      key: 'Demo tenant',
      name: 'Demo tenant',
      email: 'demo.tenant@test.com',
      address: '123 highway ',
      status: true,
    },
  });

  const passwordTest = await bcrypt.hash('Silk123456', roundsOfHashing);

  const user = await prisma.tenant_users.upsert({
    where: { email: 'test@test.com' },
    update: {
      password: passwordTest,
    },
    create: {
      email: 'test@test.com',
      first_name: 'test',
      last_name: 'test',
      password: passwordTest,
      tenant_id: tenant.id,
      is_active: true,
    },
  });

  console.log({ tenant, user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
