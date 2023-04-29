import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { PlayerService } from 'src/player/player.service';
import { GroupService } from 'src/group/group.service';
import { Player } from 'src/player/entities/player.entity';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}
  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const message = this.messageRepository.create(createMessageInput);
    return this.messageRepository.save(message);
  }

  async findAll(paginationInput: PaginationGroupInput): Promise<Message[]> {
    return this.messageRepository.find({
      skip: paginationInput.skip,
      take: paginationInput.take,
    });
  }

  async findOne(id: number): Promise<Message> {
    return this.messageRepository.findOneOrFail({ where: { id } });
  }

  async update(updateMessageInput: UpdateMessageInput): Promise<Message> {
    await this.messageRepository.save(updateMessageInput);
    return this.messageRepository.findOneOrFail({
      where: { id: updateMessageInput.id },
    });
  }

  async remove(id: Message['id']): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id: id } });

    await this.messageRepository.delete({ id });

    return message;
  }

  async getMessagesBySenderId(senderId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        senderId,
      },
    });
  }

  async findByGroupId(groupId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        groupId,
      },
    });
  }

  async getSender(senderId: number): Promise<Player> {
    return this.playerService.findOne(senderId);
  }

  async getGroup(groupId: number): Promise<Group> {
    return this.groupService.findOne(groupId);
  }
}
