import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  last_name: string;

  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  is_active = true;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  tenant_id: number;
}
