import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginResponse } from './dto/login-response.output';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup-input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse, {name: "login"})
  login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  } 

  @Mutation(()=>LoginResponse, { name: "signup" })
  signup(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<LoginResponse> {
    return this.authService.signup(signUpInput);
  } 
}
