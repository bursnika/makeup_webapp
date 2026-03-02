import { Controller, Get, Post, Body, Req, Res, UseGuards, Render, Redirect, Next, UseFilters, ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Catch(UnauthorizedException)
export class LoginExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        response.render('login', {
            title: 'Вхід - Bloom',
            error: 'Неправильний пароль, спробуйте ще раз',
            loginEmail: request.body?.loginEmail
        });
    }
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    @Render('login')
    getLoginPage() {
        return { title: 'Вхід - Bloom' };
    }

    @UseGuards(AuthGuard('local'))
    @UseFilters(LoginExceptionFilter)
    @Post('login')
    async login(@Req() req, @Res() res) {
        return new Promise<void>((resolve, reject) => {
            req.login(req.user, (err) => {
                if (err) { return reject(err); }
                res.redirect('/profile');
                resolve();
            });
        });
    }

    @Get('register')
    @Render('register')
    getRegisterPage() {
        return { title: 'Реєстрація - Bloom' };
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto, @Req() req, @Res() res) {
        const user = await this.authService.registerUser(dto);
        return new Promise<void>((resolve, reject) => {
            req.login(user, (err) => {
                if (err) { return reject(err); }
                res.redirect('/profile');
                resolve();
            });
        });
    }

    @Get('logout')
    logout(@Req() req, @Res() res, @Next() next) {
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}
