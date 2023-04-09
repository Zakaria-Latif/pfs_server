import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MatchModule } from './match/match.module';
import { MessageModule } from './message/message.module';
import { join } from 'path';

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { OnModuleInit } from '@nestjs/common';

const prisma = new PrismaClient();

const generatePlayers = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      fullName: faker.name.findName(),
      location: faker.address.city(),
      isVerified: faker.datatype.boolean(),
      verificationToken: faker.datatype.uuid(),
      resetToken: faker.datatype.uuid(),
      resetExpiration: faker.date.future(),
      description: faker.lorem.sentence(),
      playerStatisticsId: i + 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return data;
};

const generatePlayerStatistics = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      rate: parseFloat(faker.finance.amount(0, 100, 2)),
      matchesNumber: faker.datatype.number(100),
      favoritePosition: faker.helpers.arrayElement([
        'forward',
        'midfielder',
        'defender',
        'goalkeeper',
      ]),
      playerId: i + 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return data;
};

const generateMatches = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      location: faker.address.city(),
      time: faker.date.future(),
      playersNumber: faker.datatype.number({ min: 8, max: 22 }),
      prize: faker.company.catchPhrase(),
      duration: parseFloat(faker.finance.amount(0.5, 4, 1)),
      creatorId: i + 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return data;
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // to generate schema from @ObjectType() class
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MatchModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    const players = generatePlayers(10);
    const playerStatistics = generatePlayerStatistics(10);
    const matches = generateMatches(10);
    await prisma.player.createMany({ data: players });
    await prisma.playerStatistics.createMany({ data: playerStatistics });
    await prisma.match.createMany({ data: matches });
  }
}
