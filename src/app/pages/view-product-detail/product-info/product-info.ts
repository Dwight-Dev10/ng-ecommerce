import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from "../stock-status/stock-status";

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{product().name}}</h1>
    <p class="text-3xl font-extrabold mb-4">\${{product().price}}</p>
    <app-stock-status [instock]="product().inStock"/>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();
}
