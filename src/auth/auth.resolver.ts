import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { LoginResponse } from './dto/login-response.output';
import { LoginInput } from './dto/login.input';
import { LocalAuthGuard } from './guards/LocalAuthGuard';
import { UseGuards } from '@nestjs/common';
import { SignInput } from './dto/signup-input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginInput') loginInput: LoginInput, @Context() player
  ): Promise<LoginResponse> {
    return this.authService.login(player.user);
  } 

  @Mutation(()=>LoginResponse)
  signup(
    @Args('signInput') signInput: SignInput
  ): Promise<LoginResponse> {
    return this.authService.signup(signInput);
  } 
}
