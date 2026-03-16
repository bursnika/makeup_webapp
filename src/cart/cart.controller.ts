import { Controller, Post, Param, Body, UseGuards, Request, Get, Render } from '@nestjs/common';
import { CartService } from './cart.service';


@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('add/:productId')
    async addToCart(@Param('productId') productId: string, @Request() req) {
        if (!req.user) {
            return { success: false, message: 'Please log in first' };
        }

        const addedItem = await this.cartService.addItemToCart(
            req.user.idUser,
            parseInt(productId, 10),
            1
        );

        return { success: true, item: addedItem };
    }

    @Get()
    @Render('cart')
    async getCartView(@Request() req) {
        if (!req.user) {
            return {
                title: 'Кошик',
                user: null,
                items: [],
                total: 0,
                error: 'Вам потрібно увійти в свій кабінет, щоб переглянути кошик'
            };
        }

        const cart = await this.cartService.getCartForUser(req.user.idUser);

        let total = 0;
        const formattedItems = cart.cartItems.map(item => {
            const qty = item.quantity || 1;
            const itemTotal = (parseFloat(item.idProduct.price.toString()) || 0) * qty;
            total += itemTotal;
            return {
                idItem: item.idItem,
                quantity: qty,
                product: {
                    idProduct: item.idProduct.idProduct,
                    name: item.idProduct.name,
                    price: item.idProduct.price,
                    imageUrl: item.idProduct.imageUrl
                },
                itemTotal: itemTotal.toFixed(2)
            };
        });

        return {
            title: 'Ваш Кошик | Bloom',
            user: req.user,
            items: formattedItems,
            total: total.toFixed(2),
            isEmpty: formattedItems.length === 0
        };
    }
}
