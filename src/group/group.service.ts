import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { PaginationGroupInput } from './dto/pagination-group.input';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Message } from 'src/message/entities/message.entity';
import { GroupToPlayerService } from 'src/group-to-player/group-to-player.service';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @Inject(forwardRef(() => GroupToPlayerService))
    private readonly groupToPlayerService: GroupToPlayerService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
  ) {}
  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    const group = this.groupRepository.create(createGroupInput);
    return this.groupRepository.save(group);
  }

  async findAll(paginationInput: PaginationGroupInput): Promise<Group[]> {
    return this.groupRepository.find({
      take: paginationInput.take,
      skip: paginationInput.skip,
    });
  }

  async findOne(id: number): Promise<Group> {
    return this.groupRepository.findOneOrFail({ where: { id } });
  }

  async update(updateGroupInput: UpdateGroupInput): Promise<Group> {
    await this.groupRepository.save(updateGroupInput);
    return this.groupRepository.findOneOrFail({
      where: { id: updateGroupInput.id },
    });
  }

  async remove(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id: id } });
    await this.groupRepository.delete({ id });
    return group;
  }

  async getPlayers(groupId: number): Promise<GroupToPlayer[]> {
    return this.groupToPlayerService.findByGroupId(groupId);
  }

  async getMessages(groupId: number): Promise<Message[]> {
    return this.messageService.findByGroupId(groupId);
  }
}
