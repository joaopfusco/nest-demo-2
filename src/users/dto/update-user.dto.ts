import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: 'Usuario 1' })
    name?: string;

    @ApiPropertyOptional({ example: 'usuario1@email.com' })
    email?: string;

    @ApiPropertyOptional({ enum: UserRole })
    role?: UserRole;

    password?: never;
}
