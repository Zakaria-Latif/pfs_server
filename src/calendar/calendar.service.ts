import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from './entities/calendar.entity';
import { CreateCalendarInput } from './dto/create-calendar.input';
import { UpdateCalendarInput } from './dto/update-calendar.input';
import { Player } from '../player/entities/player.entity';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
  ) {}

  async findAll(): Promise<Calendar[]> {
    return this.calendarRepository.find();
  }

  async findOne(id: number): Promise<Calendar> {
    return this.calendarRepository.findOne({
      where: { id },
    });
  }

  async findOneByPlayerId(playerId: number): Promise<Calendar> {
    return this.calendarRepository.findOne({
      where: { playerId: playerId },
    });
  }

  async create(createCalendarInput: CreateCalendarInput): Promise<Calendar> {
    const existingCalendar = await this.calendarRepository.findOne({
      where: { playerId: createCalendarInput.playerId },
    });

    if (existingCalendar) {
      throw new Error(
        `Calendar already exists for playerId ${createCalendarInput.playerId}`,
      );
    }
    const calendar = this.calendarRepository.create(createCalendarInput);
    return this.calendarRepository.save(calendar);
  }

  async update(updateCalendarInput: UpdateCalendarInput): Promise<Calendar> {
    await this.calendarRepository.update(
      updateCalendarInput.id,
      updateCalendarInput,
    );
    return this.calendarRepository.findOneOrFail({
      where: { id: updateCalendarInput.id },
    });
  }

  async remove(id: number): Promise<Calendar> {
    const result = this.calendarRepository.findOne({ where: { id } });
    await this.calendarRepository.delete(id);
    return result;
  }

  async getPlayer(playerId: number): Promise<Player> {
    return this.playerService.findOne(playerId);
  }
}
