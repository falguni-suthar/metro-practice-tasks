import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.sto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/upload-sharp-image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  uploadImage(@Body() body: UploadImageDto, @UploadedFile() file: any) {
    return this.usersService.uploadImage(file);
  }

}
