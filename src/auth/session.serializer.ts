import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {
        super();
    }

    serializeUser(user: Users, done: (err: Error | null, user: any) => void): any {
        done(null, { id: user.idUser });
    }

    async deserializeUser(payload: any, done: (err: Error | null, payload: any) => void): Promise<any> {
        const user = await this.usersRepository.findOneBy({ idUser: payload.id });
        if (!user) {
            return done(new Error('User not found'), null);
        }
        const { password, ...userWithoutPassword } = user;
        done(null, userWithoutPassword);
    }
}
