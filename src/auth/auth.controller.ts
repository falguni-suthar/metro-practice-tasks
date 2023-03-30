import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResultDto } from './dto/auth-result.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() createAuthDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  async signIn(@Body() body: SigninAuthDto): Promise<AuthResultDto> {
    const result = await this.authService.signIn(body);
    return plainToClass(AuthResultDto, result);
  }
}
