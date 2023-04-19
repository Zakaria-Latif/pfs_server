import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PlayerModule } from 'src/player/player.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/Local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/Jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [ PlayerModule, PassportModule, 
    JwtModule.register({
      signOptions: { expiresIn: "24h", },
      secret: "Hide me PLEASE"
    }) ],
  exports: [AuthService]
})
export class AuthModule {}
