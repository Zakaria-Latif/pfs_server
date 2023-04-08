import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';

@Module({
  // in this example MovieCommentModule doesn't exist, but
  // you can check the provided source code
  // imports: [forwardRef(() => MovieCommentModule)],
  providers: [MatchResolver, MatchService, PrismaService],
  exports: [MatchResolver, MatchService],
})
export class MatchModule {}