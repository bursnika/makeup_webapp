import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cart } from './entities/Cart';
import { CartItem } from './entities/CartItem';
import { Products } from './entities/Products';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'passwordvi',
      database: process.env.DB_DATABASE || 'veronikaburkova',
      entities: [__dirname + '/entities/*{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Products]),
    ProductsModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService, CartService],
})
export class AppModule { }