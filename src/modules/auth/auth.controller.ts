import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Public()//Ao definir a rota como public estará visivel em toda a aplicação
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
