import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from '../users/usecases/login.useCase';

@Injectable()
export class AuthService {
  constructor(
    private loginUseCase: LoginUseCase,
    private jwtService: JwtService
  ) { }
  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.loginUseCase.authUsername(username);
    const isPasswordValid = await bcrypt.compare(pass, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}
