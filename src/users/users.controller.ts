import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.sto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly httpService: HttpService, ) {}

  @Post('/upload-sharp-image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  uploadImage(@Body() body: UploadImageDto, @UploadedFile() file: any) {
    return this.usersService.uploadImage(file);
  }

  @Post('/create-user') 
  createOrder(@Body() data) { 
    const createUser = this.usersService.createUser(data); 
    this.httpService 
    .post('https://webhook.site/34b4058a-50b4-43b8-bfe2-485c50f141bc', data) 
    .subscribe({ 
      complete: () => { 
        console.log('completed'); 
      }, 
      error: (err) => { 
        // you can handle error requests here 
        throw err;
      }, 
    }); 
    return createUser; 
  } 

}
