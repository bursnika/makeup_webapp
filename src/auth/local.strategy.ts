import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'loginEmail' });
    }

    async validate(loginEmail: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(loginEmail, pass);
        if (!user) {
            throw new UnauthorizedException('Невірний логін або пароль');
        }
        return user;
    }
}
