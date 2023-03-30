import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SigninAuthDto  {

     @ApiProperty({ example: 'admin@gmail.com' })
     @IsString()
     email: string;

     @ApiProperty({ example: 'password' })
     @IsString()
     password: string;
}