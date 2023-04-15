import { Module, forwardRef } from '@nestjs/common';
import { GroupToPlayerService } from './group-to-player.service';
import { GroupToPlayerResolver } from './group-to-player.resolver';
import { GroupToPlayer } from './entities/group-to-player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [ TypeOrmModule.forFeature([GroupToPlayer]),  
  forwardRef(() => PlayerModule), forwardRef(() => GroupModule),
  ],
  providers: [GroupToPlayerResolver, GroupToPlayerService],
  exports: [ GroupToPlayerService ]
})
export class GroupToPlayerModule {}
