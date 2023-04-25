import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { OnModuleInit, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { PlayerStatisticsModule } from './player-statistics/player-statistics.module';
import { GroupModule } from './group/group.module';
import { GroupToPlayerModule } from './group-to-player/group-to-player.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group/entities/group.entity';
import { GroupToPlayer } from './group-to-player/entities/group-to-player.entity';
import { Message } from './message/entities/message.entity';
import { MatchToPlayerModule } from './match-to-player/match-to-player.module';
import { MatchToPlayer } from './match-to-player/entities/match-to-player.entity';
import * as morgan from 'morgan';
import { AuthModule } from './auth/auth.module';

import { faker } from '@faker-js/faker';
import { Player } from './player/entities/player.entity';
import { PlayerStatistics } from './player-statistics/entities/player-statistic.entity';
import { Match } from './match/entities/match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerRepository } from './player/player.repository';

const generatePlayers = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      fullName: faker.name.fullName(),
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
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forFeature([Player]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('app.host', process.env.DATABASE_HOST),
        port: configService.get<number>(
          'app.port',
          Number(process.env.DATABASE_PORT),
        ),
        username: configService.get<string>(
          'app.username',
          process.env.DATABASE_USER,
        ),
        password: configService.get<string>(
          'app.password',
          process.env.DATABASE_PASSWORD,
        ),
        database: configService.get<string>(
          'app.database',
          process.env.DATABASE_NAME,
        ),
        entities: [
          Group,
          GroupToPlayer,
          Match,
          MatchToPlayer,
          Message,
          Player,
          PlayerStatistics,
        ],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
      }),
      inject: [ConfigService],
    }),
    MatchModule,
    PlayerModule,
    PlayerStatisticsModule,
    GroupModule,
    GroupToPlayerModule,
    MessageModule,
    MatchToPlayerModule,
    AuthModule,
  ],
  providers: [PlayerRepository],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
    console.log('Morgan initialized');
  }

  async onModuleInit() {
    /*const players = generatePlayers(10);
    const playerStatistics = generatePlayerStatistics(10);
    const matches = generateMatches(10);

    for (let p of players ) {
      try {
        await this.playerRepository.save(p)
        console.log(p)
      } catch (e) {
        console.log(e)
      }
    }
    console.log('App module initialized');*/
  }
}
