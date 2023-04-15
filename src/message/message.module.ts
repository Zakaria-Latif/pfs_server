import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Message]) , forwardRef(() => PlayerModule), 
    forwardRef(() => GroupModule),],
  providers: [MessageResolver, MessageService],
  exports: [ MessageService ]
})
export class MessageModule {}
