import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Orders } from '../entities/Orders';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
    ) { }

    async getUserProfile(userId: number): Promise<any> {
        const user = await this.usersRepository.findOneBy({ idUser: userId });

        const cart = await this.cartRepository.findOne({
            where: { idUser: userId as any },
            relations: ['cartItems', 'cartItems.idProduct'],
        });

        const orders = await this.ordersRepository.find({
            where: { idUser: userId as any },
            order: { orderDate: 'DESC' }
        });

        return { user, cart, orders };
    }
}
