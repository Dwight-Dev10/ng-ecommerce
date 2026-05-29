import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatIconModule, MatButtonModule, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button mat-icon-button routerLink="/wishlist" 
      [matBadge]="store.wishListCount()"
      [matBadgeHidden]="store.wishListCount() === 0">

        <mat-icon>favorite</mat-icon>
      </button>
      <!-- Cart Button -->
      <button mat-icon-button [matBadge]="store.cartCount()" 
      [matBadgeHidden]="store.cartCount() === 0"
      routerLink="/cart">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton routerLink="/sign-in">Sign in</button>
      <button matButton="filled">Sign Out</button>
    `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
