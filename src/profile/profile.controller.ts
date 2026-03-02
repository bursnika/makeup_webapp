import { Controller, Get, Render, UseGuards, Req, Res, UseFilters } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AuthExceptionFilter } from '../auth/auth-exception.filter';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseFilters(AuthExceptionFilter)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    @UseGuards(AuthenticatedGuard)
    @Render('profile')
    async getProfile(@Req() req, @Res() res) {
        const userId = req.user.idUser;

        try {
            const { user, cart, orders } = await this.profileService.getUserProfile(userId);

            let cartTotal = 0;
            if (cart && cart.cartItems) {
                cartTotal = cart.cartItems.reduce((total, item) => {
                    const price = item.idProduct?.price ? Number(item.idProduct.price) : 0;
                    return total + (price * item.quantity);
                }, 0);
            }

            return { title: 'Кабінет - Bloom', profileUser: user, cart, cartTotal, orders };
        } catch (e) {
            console.error('Profile error:', e);
            res.redirect('/auth/login');
        }
    }
}
