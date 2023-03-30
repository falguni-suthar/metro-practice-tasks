import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UploadImageDto {

     @ApiProperty({ type: 'string', format: 'binary' })
     image: any;
}