import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { Repository } from 'typeorm';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
import { PlayerService } from 'src/player/player.service';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class NotificationService {
  private pubSub: PubSub;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
  ) {
    this.pubSub = new PubSub();
  }

  async createNotification(
    createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    let notification = await this.notificationRepository.create(
      createNotificationInput,
    );
    notification = await this.notificationRepository.save(notification);
    this.pubSub.publish('notificationCreated', {
      notificationCreated: notification,
    });
    return notification;
  }

  notificationCreated() {
    return this.pubSub.asyncIterator('notificationCreated');
  }

  async getNotificationsByRecipient(
    recipientId: number,
  ): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { recipient: { id: recipientId } },
    });
  }

  async getUnreadNotificationsByRecipient(
    recipientId: number,
  ): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { recipient: { id: recipientId }, isRead: false },
    });
  }

  async markNotificationAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });
    if (notification) {
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    }
    return notification;
  }

  async deleteNotification(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });
    await this.notificationRepository.delete(notificationId);
    return notification;
  }

  async getRecipient(recipientId: number): Promise<Player> {
    return this.playerService.findOne(recipientId);
  }
}