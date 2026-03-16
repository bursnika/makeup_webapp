import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Products } from '../entities/Products';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>
    ) { }

    async getCartForUser(userId: number): Promise<Cart> {
        let cart = await this.cartRepository.findOne({
            where: { idUser: userId },
            relations: ['cartItems', 'cartItems.idProduct'],
        });

        if (!cart) {
            cart = this.cartRepository.create({ idUser: userId });
            await this.cartRepository.save(cart);
            cart.cartItems = [];
        }

        return cart;
    }

    async addItemToCart(userId: number, productId: number, quantity: number = 1) {
        const cart = await this.getCartForUser(userId);
        const product = await this.productsRepository.findOne({ where: { idProduct: productId } });

        if (!product) {
            throw new NotFoundException('Товар не знайдено');
        }

        let cartItem = await this.cartItemRepository.createQueryBuilder("cartItem")
            .where("cartItem.id_cart = :cartId", { cartId: cart.idCart })
            .andWhere("cartItem.id_product = :productId", { productId: productId })
            .getOne();

        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + quantity;
        } else {
            cartItem = this.cartItemRepository.create({
                idCart: cart,
                idProduct: product,
                quantity: quantity
            });
        }

        return await this.cartItemRepository.save(cartItem);
    }
}
