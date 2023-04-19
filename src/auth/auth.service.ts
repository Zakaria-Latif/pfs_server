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

  async login(loginInput: LoginInput): Promise<any>{
    const user = await this.playerService.findPlayerByUsername(loginInput.username);
    if (!user) {
      return "User Not Found";
    }
    bcrypt.compare(
      loginInput.password,
      user.password,
      (err, isMatch: boolean) => {
          if (err) throw err;
          if (isMatch === true) {
            const token = this.jwtService.sign(
              {
                  user,
              },
              { expiresIn: "24h" }
          );
              return  token
          } else {
              return "Password Incorrect"
          }
      }
  )
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
      fullName: signupInput.fullName,
      username: signupInput.username,
      password: await bcrypt.hash(signupInput.password, 12)
    });
    return {
      accessToken: this.jwtService.sign({ username: player.username, sub: player.id }),
      player
    }
  }

  async validateUserByJwt(token: string): Promise<Player> {
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
