import { Controller, Post, Body, Get, Render, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productsService.create(newProduct);
  }

  @Get()
  @Render('products')
  async getAllProducts(@Query() query: any) {
    const products = await this.productsService.findAll(query);
    return { title: 'Наші продукти - Bloom', products, currentQuery: query };
  }
}