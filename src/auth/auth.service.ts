import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/Users';
import { Cart } from '../entities/Cart';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOneBy({ loginEmail: email });
        if (user && user.password) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async registerUser(dto: RegisterUserDto): Promise<any> {
        const existing = await this.usersRepository.findOneBy({ loginEmail: dto.loginEmail });
        if (existing) {
            throw new ConflictException('Користувач з таким email вже існує');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = this.usersRepository.create({
            loginEmail: dto.loginEmail,
            password: hashedPassword,
            firstName: dto.firstName,
            lastName: dto.lastName,
        });

        const savedUser = await this.usersRepository.save(newUser);

        const cart = this.cartRepository.create({ idUser: savedUser.idUser });
        await this.cartRepository.save(cart);

        const { password, ...result } = savedUser;
        return result;
    }
}
