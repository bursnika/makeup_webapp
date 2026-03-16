import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly appService: AppService,
    private readonly productsService: ProductsService
  ) { }

  @Get()
  @Render('index')
  async getIndex() {
    const rawCategoryData = await this.productsService.getCategoryDistribution();

    const categoryLabels = rawCategoryData.map(d => d.category);
    const categoryCounts = rawCategoryData.map(d => d.count);

    return {
      title: 'Головна - Bloom',
      chartData: JSON.stringify({
        labels: categoryLabels,
        data: categoryCounts
      })
    };
  }
}
