import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TokensDto } from './dto/tokens.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { JwtRefreshAuthGuard } from 'src/common/guards/jwt-refresh-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth('token')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @ApiResponse({ status: 200, type: TokensDto })
    async login(@Body() credentialsDto: CredentialsDto) {
        return await this.authService.login(credentialsDto);
    }

    @Get('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    @ApiResponse({ status: 200, type: TokensDto })
    async refresh(@Req() req: Request & { user: JwtPayload }) {
        return this.authService.refreshTokens(req.user);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, type: JwtPayload})
    getProfile(@Req() req: Request & { user: JwtPayload }) {
        return req.user;
    }
}
