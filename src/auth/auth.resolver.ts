import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { LoginResponse } from './dto/login-response.output';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup-input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  } 

  @Mutation(()=>LoginResponse)
  signup(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<LoginResponse> {
    return this.authService.signup(signUpInput);
  } 
}
