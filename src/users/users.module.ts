import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { User } from './entities/user.entity';
import { Image } from './entities/image.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      storage: memoryStorage()
    }),
    HttpModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
