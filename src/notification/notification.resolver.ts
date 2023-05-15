import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
import { PubSub } from 'graphql-subscriptions';
import { Player } from 'src/player/entities/player.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Query(() => [Notification])
  async getNotificationsByRecipient(
    @Args('recipientId', { type: () => Int }) recipientId: number,
    @Context() context: any 
  ): Promise<Notification[]> {
    return this.notificationService.getNotificationsByRecipient(recipientId,  context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Notification])
  async getUnreadNotificationsByRecipient(
    @Args('recipientId', { type: () => Int }) recipientId: number,
    @Context() context: any
  ): Promise<Notification[]> {
    return this.notificationService.getUnreadNotificationsByRecipient(
      recipientId,
      context.req.user.id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Notification)
  async markNotificationAsRead(
    @Args('notificationId', { type: () => Int }) notificationId: number,
    @Context() context: any
  ): Promise<Notification> {
    return this.notificationService.markNotificationAsRead(notificationId, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Notification)
  async deleteNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
    @Context() context: any
  ): Promise<Notification> {
    return this.notificationService.deleteNotification(notificationId, context.req.user.id);
  }

  @ResolveField()
  async recipient(@Parent() notification: Notification): Promise<Player> {
    return this.notificationService.getRecipient(notification.recipientId);
  }
}
