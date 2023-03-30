import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
 
     @IsString()
     @ApiProperty({ example: 'admin', required: true })
     firstName: string;

     @IsString()
     @ApiProperty({ example: 'admin', required: true })
     lastName: string;

     @IsEmail()
     @ApiProperty({ example: 'admin@gmail.com', required: true })
     email: string;

     @ApiProperty({ example: 'password', required: true })
     @IsString()
     password: string;

     @ApiProperty({ example: '9876543210', required: true })
     @IsOptional()
     mobile: string;
}
