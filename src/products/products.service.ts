import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/Products';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) { }

  async create(newProduct: CreateProductDto) {
    const product = this.productsRepository.create(newProduct);
    return await this.productsRepository.save(product);
  }
  async findAll(query?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) {
    const qb = this.productsRepository.createQueryBuilder('product');

    if (query?.category) {
      qb.andWhere('product.category = :category', { category: query.category });
    }

    if (query?.minPrice) {
      qb.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });
    }

    if (query?.maxPrice) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice });
    }

    if (query?.search) {
      qb.andWhere('product.name ILIKE :search', { search: `%${query.search}%` });
    }

    return await qb.getMany();
  }
}