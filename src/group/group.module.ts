import { Module, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { MessageModule } from 'src/message/message.module';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Message } from 'src/message/entities/message.entity';
import { GroupToPlayerService } from 'src/group-to-player/group-to-player.service';
import { GroupToPlayerModule } from 'src/group-to-player/group-to-player.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Group]) ,
  forwardRef(() => GroupToPlayer), forwardRef(() => MessageModule), forwardRef(()=>GroupToPlayerModule), forwardRef(()=>PlayerModule)
],
  providers: [GroupResolver, GroupService],
  exports: [ GroupService ]
})
export class GroupModule {}
