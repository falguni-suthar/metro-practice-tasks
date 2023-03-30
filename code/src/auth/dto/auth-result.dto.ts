import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseDto } from 'src/helper/dto/response.dto';

export class AuthResultDto extends ResponseDto {
    @ApiProperty({ required: true })
    @Expose()
    data?: any;
}