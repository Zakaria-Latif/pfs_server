import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationModule } from 'src/invitation/invitation.module';
import { RequestModule } from 'src/request/request.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    forwardRef(() => RequestModule),
    forwardRef(() => InvitationModule),
    forwardRef(() => PlayerModule),
  ],
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService],
})
export class NotificationModule {}
