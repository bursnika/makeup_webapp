import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { Users } from '../entities/Users';
import { Cart } from '../entities/Cart';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Cart]),
        PassportModule.register({ session: true }),
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule { }
