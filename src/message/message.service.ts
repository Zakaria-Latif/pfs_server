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
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,
  @Inject(forwardRef(() => PlayerService))
  private readonly playerService: PlayerService,
  @Inject(forwardRef(() => GroupService))
  private readonly groupService: GroupService,
  ){}
  async create(createMessageInput: CreateMessageInput):  Promise<Message> {
    return null;
  }

  async findAll(paginationInput: PaginationGroupInput):  Promise<Message[]> {
    return this.messageRepository.find({
      skip: paginationInput.skip,
      take: paginationInput.take
    });
  }

  async findOne(id: number):  Promise<Message> {
    return this.messageRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateMessageInput: UpdateMessageInput):  Promise<Message> {
    return null;
  }

  async remove(id: number):  Promise<Message> {
    return null;
  }

  async getMessagesBySenderId(senderId: number): Promise<Message[]>{
    return this.messageRepository.find({
      where:{
        senderId
      }
    })
  }

  async findByGroupId(groupId: number): Promise<Message[]>{
    return this.messageRepository.find({
      where: {
        groupId
      }
    })
  }

  async getSender(senderId: number): Promise<Player>{
    return this.playerService.findOne(senderId);
  }
  
  async getGroup(groupId: number): Promise<Group>{
    return this.groupService.findOne(groupId);
  }
}
