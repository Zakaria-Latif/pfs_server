import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PlayerService } from 'src/player/player.service';
import { Player } from 'src/player/entities/player.entity';
import { LoginResponse } from './dto/login-response.output';
import { JwtService } from '@nestjs/jwt';
import { SignInput } from './dto/signup-input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  
  constructor(private playerService: PlayerService, private readonly jwtService: JwtService){}

  async validatePlayer(email: string, password: string): Promise<any>{
    const user = await this.playerService.findPlayerByEmail(email);
    if (user?.password !== password) {
      return null;
    }
    const { password: pass, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  async login(player: Player): Promise<LoginResponse>{
    // const { password, ...rest } = player;
    return {
      accessToken: this.jwtService.sign({ username: player.username, sub: player.id }),
      player
    }
  }

  async signup(signupInput: SignInput): Promise<LoginResponse>{
    const user= await this.playerService.findPlayerByEmail(signupInput.email);
    if(user) throw new BadRequestException("Email has already been used by an other player");

    const player=await this.playerService.create({
      username: signupInput.username,
      email: signupInput.email,
      password: await bcrypt.hash(signupInput.password, 10)
    });
    return {
      accessToken: this.jwtService.sign({ username: player.username, sub: player.id }),
      player
    }
  }

  async validateUserById(id: any): Promise<Player> {
    return this.playerService.findOne(id);
  }

  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
