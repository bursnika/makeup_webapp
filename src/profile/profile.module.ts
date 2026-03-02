import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Users } from '../entities/Users';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Products } from '../entities/Products';
import { Orders } from '../entities/Orders';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Cart, CartItem, Products, Orders])],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule { }
