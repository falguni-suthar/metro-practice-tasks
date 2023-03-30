import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/helper/messages';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { code } from 'src/helper/codes';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from 'src/users/dto/create-auth.dto';
import { ResponseDto } from 'src/helper/dto/response.dto';
import { AuthResultDto } from './dto/auth-result.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateAuthDto): Promise<any> {
    try {

      const { firstName, lastName, email, password, mobile } = body;
      const userExist = await this.userRepository.findOneBy({ email });

      if(userExist) {
        throw new HttpException(Messages.userExist, HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new User()
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashPassword;
      user.mobile = mobile;

      const result = await this.userRepository.save(user);
      if(!result) {
        throw new HttpException(Messages.signupFailed, HttpStatus.BAD_REQUEST);
      }

      return { statusCode: code.created, message: Messages.signupSuccess }
      
    } catch (error) {
      throw error;
    }
  }

  async signIn(body: SigninAuthDto): Promise<AuthResultDto> {
    try {

      const { email, password } = body;
      const user = await this.userRepository.findOneBy({ email });
      if(!user) {
        throw new HttpException(Messages.userNotExist, HttpStatus.BAD_REQUEST);
      }

      if(user.isActive != true) {
        throw new HttpException(Messages.inactiveAccount, HttpStatus.BAD_REQUEST);
      }

      if(user && await bcrypt.compare(password, user.password )) {

        const payload = { email: user.email, id: user.id };
        const accessToken = await this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

        return {
          statusCode: code.success,
          message: Messages.loginSuccess,
          data: {
            accessToken,
            user
          }
        }

      } else {
        throw new HttpException(Messages.invalidPassword, HttpStatus.NOT_FOUND);
      }
      
    } catch (error) {
      throw error;
    }
  }
}
