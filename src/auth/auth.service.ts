import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {}

    generateTokens(user: User): TokensDto {
        const payload = { sub: user.id, email: user.email, role: user.role };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });

        const tokens = new TokensDto();
        tokens.accessToken = accessToken;
        tokens.refreshToken = refreshToken;
        tokens.user = user;

        return tokens;
    }

    async login(credentialsDto: CredentialsDto): Promise<TokensDto> {
        const user = await this.usersService.findOneBy({
            email: credentialsDto.email
        });
        
        if (!(await user.validatePassword(credentialsDto.password)))
            throw new UnauthorizedException('Invalid credentials.');

        return this.generateTokens(user);
    }

    async refreshTokens(payload: JwtPayload): Promise<TokensDto> {
        const user = await this.usersService.findOne(payload.userId);
        return this.generateTokens(user);
    }
}
