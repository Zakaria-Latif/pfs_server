import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PlayerService } from 'src/player/player.service';
import { Player } from 'src/player/entities/player.entity';
import { LoginResponse } from './dto/login-response.output';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/signup-input';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  
  constructor(private playerService: PlayerService, private readonly jwtService: JwtService){}

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    console.log(loginInput);
    const user = await this.playerService.findPlayerByUsername(loginInput.username);
    console.log({user});
    if (!user) {
      throw new UnauthorizedException("This user does not exist");
    }
    const isMatch = await bcrypt.compare(loginInput.password, user.password);

    // TODO: why isMatch always = false ??
    const p = await bcrypt.hash(loginInput.password, 12)
    console.log(isMatch, loginInput.password, user.password, p)
    if (isMatch) {
      const token = this.jwtService.sign({ username: user.username, sub: user.id }, 
        { expiresIn: '24h' , secret: process.env.JWT_SECRET});
      return {
        accessToken: token,
        player: user,
      }
    }
    throw new UnauthorizedException("Password is not valid");
  }
   

  async validatePlayer(player: Player): Promise<LoginResponse>{
    return {
      accessToken: this.jwtService.sign({ username: player.username, sub: player.id }),
      player
    }
  }

  async signup(signupInput: SignUpInput): Promise<LoginResponse>{
    const user= await this.playerService.findPlayerByUsername(signupInput.username);
    if(user) throw new BadRequestException("Username has already been used by an other player");

    const player=await this.playerService.create({
      email: signupInput.email,
      username: signupInput.username,
      password: await bcrypt.hash(signupInput.password, 12)
    });
    return {
      accessToken: this.jwtService.sign({ username: player.username, sub: player.id }, 
        { secret: process.env.JWT_SECRET }
        ),
      player
    }
  }

  async validateUserByJwt(token: string): Promise<Player> {
    console.log({ JWT_SECRET: process.env.JWT_SECRET });
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET
    });
    const user= await this.playerService.findPlayerByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }

  async validateUserById(id: any): Promise<Player> {
    return this.playerService.findOne(id);
  }
}
