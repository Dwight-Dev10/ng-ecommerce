import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatInput } from "@angular/material/input";
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header-search-bar',
  imports: [MatInput, MatIconButton, MatIcon],
  template: ` 
  <div class="search-bar-container">
    <button mat-icon-button (click)="onSearchInput(searchInput.value)">
      <mat-icon >search</mat-icon>
    </button>
    <input #searchInput matInput type="text" placeholder="Search..." (keyup.ENTER)="onSearchInput(searchInput.value)"/>
  </div>
  `,
  styles: ``,
})
export class HeaderSearchBar {
  store = inject(EcommerceStore);

  
  onSearchInput(term: string) {
    this.store.searchProducts(term);
  }
  
}
