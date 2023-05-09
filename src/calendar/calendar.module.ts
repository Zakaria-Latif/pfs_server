import { Module, forwardRef } from '@nestjs/common';
import { CalendarResolver } from './calendar.resolver';
import { CalendarService } from './calendar.service';
import { Calendar } from './entities/calendar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calendar]),
    forwardRef(() => PlayerModule),
  ],
  providers: [CalendarResolver, CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
