import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PlayerModule } from 'src/player/player.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/Jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService,  JwtStrategy],
  imports: [ PlayerModule, PassportModule.register({defaultStrategy: "jwt"}), 
    JwtModule.register({
      signOptions: { expiresIn: "24h", },
      secret: process.env.JWT_SECRET
    }) ],
  exports: [AuthService]
})
export class AuthModule {}
