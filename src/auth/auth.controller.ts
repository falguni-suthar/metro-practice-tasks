import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/helper/decorators/roles.decorator';
import { Role } from 'src/helper/enum/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResultDto } from './dto/auth-result.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @Roles(Role.Admin)
  signUp(@Body() createAuthDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  @Roles(Role.User)
  async signIn(@Body() body: SigninAuthDto): Promise<AuthResultDto> {
    const result = await this.authService.signIn(body);
    return plainToClass(AuthResultDto, result);
  }
}
