import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";

@Component({
  selector: 'app-checkout',
  imports: [BackButton],
  template: ` 
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-4" navigateTo="/cart">Back to Cart</app-back-button>
      <h1 class="text-3xl font-extrabold mb-4">Checkout</h1>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
          
        </div>

      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {

}
