import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../common/entities/base.entity';
import { UserRole } from '../enums/user-role.enum';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends EntityBase {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude() // needs plainToInstance(User, user);
    private password: string;

    async setPassword(password: string): Promise<void> {
        this.password = await argon2.hash(password);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await argon2.verify(this.password, password);
    }

    @ApiProperty()
    @Column({
        type: 'text',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role: UserRole;
}
