import { Injectable } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerInput } from './player.input';
import { PlayerStatistics } from 'src/playerStatistics/playerStatistics.entity';

@Injectable()
export class PlayerService {
    constructor(private prisma: PrismaService) {}

    async createPlayer(createMatchInput: CreatePlayerInput): Promise<Player>{
        let playerStatistics=await this.prisma.playerStatistics.create({
            data: {
                favoritePosition: ""
            }
        });
        // return this.prisma.player.create({
        //     playerStatistics: {
        //         create: {
        //             favoritePosition: "Attack"
        //         },
        //     },
        //     data: {
        //         username: createMatchInput.username,
        //         password: createMatchInput.password,
        //     }
        // })
        return null;
    }
}
