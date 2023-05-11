import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
import { PubSub } from 'graphql-subscriptions';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification)
  async createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    const notification = this.notificationService.createNotification(
      createNotificationInput,
    );
    return notification;
  }

  @Subscription((returns) => Notification)
  notificationCreated() {
    return this.notificationService.notificationCreated();
  }

  @Query(() => [Notification])
  async getNotificationsByRecipient(
    @Args('recipientId', { type: () => Int }) recipientId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getNotificationsByRecipient(recipientId);
  }

  @Query(() => [Notification])
  async getUnreadNotificationsByRecipient(
    @Args('recipientId', { type: () => Int }) recipientId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getUnreadNotificationsByRecipient(
      recipientId,
    );
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(
    @Args('notificationId', { type: () => Int }) notificationId: number,
  ): Promise<Notification> {
    return this.notificationService.markNotificationAsRead(notificationId);
  }

  @Mutation(() => Notification)
  async deleteNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
  ): Promise<Notification> {
    return this.notificationService.deleteNotification(notificationId);
  }

  @ResolveField()
  async recipient(@Parent() notification: Notification): Promise<Player> {
    return this.notificationService.getRecipient(notification.recipientId);
  }
}
