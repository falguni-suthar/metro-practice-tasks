import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'admin@gmail.com', required: true })
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @ApiProperty({ example: 'password', required: false })
    @MinLength(1)
    password: string;

    @ApiProperty({ example: 'firstName', required: true })
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'LastName', required: true })
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: '9876543210', required: true })
    @IsOptional()
    mobile: string;

    @ApiProperty({ example: 'A0 Test building', required: false })
    @IsOptional()
    address: string;

    @ApiProperty({ example: 'A0 Test building', required: false })
    @IsOptional()
    address_line2: string;

    @ApiProperty({ example: 'Ahmedabad', required: false })
    @IsOptional()
    city: string;

    @ApiProperty({ example: 'gujarat', required: false })
    @IsOptional()
    state: string;

    @ApiProperty({ example: 'india', required: false })
    @IsOptional()
    country: string;

    @ApiProperty({ example: 'india', required: false })
    @IsOptional()
    zipcode: string;

    @ApiProperty({ example: 'ADMIN', required: true })
    @IsString()
    @IsNotEmpty()
    user_role: string;

    @ApiProperty({ example: 'Housekeeping', required: false })
    @IsOptional()
    department: string;

    @ApiProperty({ example: '1', required: false })
    @IsOptional()
    property_group_id: number;

    @ApiProperty({ example: '1', required: false })
    @IsOptional()
    breezeway_user_id: number;

    @ApiProperty({ example: 'gold', required: false })
    @IsOptional()
    membership_plan: string;

    @ApiProperty({ example: 'PHC', required: false })
    @IsOptional()
    user_app_type: string;
}
