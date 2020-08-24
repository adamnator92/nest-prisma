import { PrismaClient } from '@prisma/client';
import { UtilsService } from '../src/services/utils.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const app = await NestFactory.create(AppModule);
  const util = app.get(UtilsService);

  const user1 = await prisma.user.create({
    data: {
      email: 'adam@alpha.com',
      name: 'adam',
      password: await util.hashPassword('abc123'),
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'adam@snappy.com',
      name: 'adam',
      password: await util.hashPassword('abc123'),
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect();
  });
