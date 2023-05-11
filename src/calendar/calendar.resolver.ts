import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Calendar } from './entities/calendar.entity';
import { CalendarService } from './calendar.service';
import { CreateCalendarInput } from './dto/create-calendar.input';
import { UpdateCalendarInput } from './dto/update-calendar.input';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => Calendar)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Mutation(() => Calendar)
  createCalendar(
    @Args('createCalendarInput') createCalendarInput: CreateCalendarInput,
  ) {
    return this.calendarService.create(createCalendarInput);
  }

  @Query(() => [Calendar], { name: 'calendars' })
  findAll() {
    return this.calendarService.findAll();
  }

  @Query(() => Calendar, { name: 'calendar' })
  findOne(@Args('Id', { type: () => Int }) Id: number) {
    return this.calendarService.findOne(Id);
  }

  @Query(() => Calendar, { name: 'calendarByPlayerId' })
  findByPlayerId(@Args('playerId', { type: () => Int }) playerId: number) {
    return this.calendarService.findOneByPlayerId(playerId);
  }

  @Mutation(() => Calendar)
  updateCalendar(
    @Args('updateCalendarInput') updateCalendarInput: UpdateCalendarInput,
  ) {
    return this.calendarService.update(updateCalendarInput);
  }

  @Mutation(() => Calendar)
  removeCalendar(@Args('id', { type: () => Int }) id: number) {
    return this.calendarService.remove(id);
  }

  @ResolveField((returns) => Player)
  async player(@Parent() calendar: Calendar): Promise<Player> {
    return this.calendarService.getPlayer(calendar.playerId);
  }
}
