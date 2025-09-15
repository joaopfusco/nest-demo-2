import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Usuario 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'usuario1@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, example: 'Usuario1@123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
