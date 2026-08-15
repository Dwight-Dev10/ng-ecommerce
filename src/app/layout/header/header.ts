import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { HeaderSearchBar } from "../header-search-bar/header-search-bar";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, HeaderSearchBar],
  template: ` 
  <mat-toolbar class="w-full elevated py-2">
    <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
      <span>Modern E-commerce</span>
      <app-header-search-bar/>
      <app-header-actions/>
    </div>
  </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
