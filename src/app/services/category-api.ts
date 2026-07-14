import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CategoryApi{
    private categories = ['all', 'electronics', 'Home ', 'Fitness', 'Accessories', 'Clothing', ];

    getCategories(){
        return this.categories;
    }
}