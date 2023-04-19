import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { OnModuleInit } from '@nestjs/common';
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
import { Match } from './match/entities/match.entity';
import { Message } from './message/entities/message.entity';
import { Player } from './player/entities/player.entity';
import { PlayerStatistics } from './player-statistics/entities/player-statistic.entity';
import { MatchToPlayerModule } from './match-to-player/match-to-player.module';
import { MatchToPlayer } from './match-to-player/entities/match-to-player.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('app.host', 'localhost'),
        port: configService.get<number>('app.port', 3306),
        username: configService.get<string>('app.username', 'root'),
        password: configService.get<string>('app.password', 'root'),
        database: configService.get<string>('app.database', 'pfs'),
        entities: [Group, GroupToPlayer, Match, MatchToPlayer, Message, Player, PlayerStatistics],
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
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
  }
}
