import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGroupToPlayerInput } from './dto/create-group-to-player.input';
import { UpdateGroupToPlayerInput } from './dto/update-group-to-player.input';
import { GroupToPlayer } from './entities/group-to-player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { Group } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class GroupToPlayerService {
  constructor(
    @InjectRepository(GroupToPlayer)
    private groupToPlayerRepository: Repository<GroupToPlayer>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}
  async create(
    createGroupToPlayerInput: CreateGroupToPlayerInput,
  ): Promise<GroupToPlayer> {
    const groupToPlayer = this.groupToPlayerRepository.create(
      createGroupToPlayerInput,
    );
    return this.groupToPlayerRepository.save(groupToPlayer);
  }

  // async findAll(
  //   paginationInput: PaginationGroupInput,
  // ): Promise<GroupToPlayer[]> {
  //   return this.groupToPlayerRepository.find({
  //     take: paginationInput.take,
  //     skip: paginationInput.skip,
  //   });
  // }

  async findOne(id: number): Promise<GroupToPlayer> {
    return this.groupToPlayerRepository.findOneOrFail({ where: { id } });
  }

  async update(
    UpdateGroupToPlayerInput: UpdateGroupToPlayerInput,
  ): Promise<GroupToPlayer> {
    await this.groupToPlayerRepository.save(UpdateGroupToPlayerInput);
    return this.groupToPlayerRepository.findOneOrFail({
      where: { id: UpdateGroupToPlayerInput.id },
    });
  }

  async remove(id: number): Promise<GroupToPlayer> {
    const groupToPlayer = await this.groupToPlayerRepository.findOne({
      where: { id: id },
    });
    await this.groupToPlayerRepository.delete({ id });
    return groupToPlayer;
  }

  async findByPlayerId(playerId: number): Promise<GroupToPlayer[]> {
    return this.groupToPlayerRepository.find({
      where: {
        playerId,
      },
    });
  }

  async getPlayer(playerId: number): Promise<Player> {
    return this.playerService.findOne(playerId);
  }

  async getGroup(groupId: number): Promise<Group> {
    return this.groupService.findOne(groupId);
  }

  async findByGroupId(groupId: number): Promise<GroupToPlayer[]> {
    return this.groupToPlayerRepository.find({
      where: {
        groupId,
      },
    });
  }
}
