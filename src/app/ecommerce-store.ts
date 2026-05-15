import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, 
        withComputed, withMethods, withState } from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "./services/toaster";

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
};
/* `EcommerceStore` is a signal store in Angular using `@ngrx/signals` library. It defines
the state of an e-commerce application including products, category, and wishlist
items. It initializes the state with a list of products and provides computed
properties for filtered products based on the selected category and the count of items
in the wishlist. */
export const EcommerceStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: [{
    id: 'p1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality over-ear headphones with noise cancellation and 20-hour battery life.',
    price: 129.99,
    imageUrl: 'https://picsum.photos/seed/headphones/400/300',
    rating: 4.5,
    reviewCount: 342,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'p2',
    name: 'Smart Fitness Watch',
    description: 'Track your workouts, heart rate, and sleep with this sleek fitness watch.',
    price: 89.99,
    imageUrl: 'https://picsum.photos/seed/watch/400/300',
    rating: 4.2,
    reviewCount: 198,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'p3',
    name: 'Men\'s Casual Sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    price: 64.99,
    imageUrl: 'https://picsum.photos/seed/sneakers/400/300',
    rating: 4.3,
    reviewCount: 121,
    inStock: true,
    category: 'Clothing'
  },
  {
    id: 'p4',
    name: 'Women\'s Denim Jacket',
    description: 'Classic denim jacket with a modern fit.',
    price: 79.99,
    imageUrl: 'https://picsum.photos/seed/jacket/400/300',
    rating: 4.6,
    reviewCount: 89,
    inStock: false,
    category: 'Clothing'
  },
  {
    id: 'p5',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold or hot for hours with this insulated bottle.',
    price: 24.99,
    imageUrl: 'https://picsum.photos/seed/bottle/400/300',
    rating: 4.7,
    reviewCount: 512,
    inStock: true,
    category: 'Home & Kitchen'
  },
  {
    id: 'p6',
    name: 'Gaming Mouse RGB',
    description: 'Precision gaming mouse with customizable RGB lighting.',
    price: 49.99,
    imageUrl: 'https://picsum.photos/seed/mouse/400/300',
    rating: 4.4,
    reviewCount: 276,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'p7',
    name: '4K Ultra HD Monitor',
    description: '27-inch 4K monitor with vibrant colors and ultra-thin bezels.',
    price: 329.99,
    imageUrl: 'https://picsum.photos/seed/monitor/400/300',
    rating: 4.6,
    reviewCount: 143,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'p8',
    name: 'Coffee Maker Machine',
    description: 'Brew delicious coffee at home with programmable settings.',
    price: 59.99,
    imageUrl: 'https://picsum.photos/seed/coffeemaker/400/300',
    rating: 4.1,
    reviewCount: 87,
    inStock: true,
    category: 'Home & Kitchen'
  },
  {
    id: 'p9',
    name: 'Yoga Mat Non-Slip',
    description: 'Eco-friendly yoga mat with excellent grip and cushioning.',
    price: 29.99,
    imageUrl: 'https://picsum.photos/seed/yogamat/400/300',
    rating: 4.5,
    reviewCount: 231,
    inStock: true,
    category: 'Fitness'
  },
  {
    id: 'p10',
    name: 'Backpack Travel Laptop Bag',
    description: 'Durable backpack with padded laptop compartment and USB charging port.',
    price: 54.99,
    imageUrl: 'https://picsum.photos/seed/backpack/400/300',
    rating: 4.4,
    reviewCount: 310,
    inStock: false,
    category: 'Accessories'
  },
  {
    id: 'p11',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with most smartphones.',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/charger/400/300',
    rating: 4.0,
    reviewCount: 156,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'p12',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with brightness control and USB port.',
    price: 34.99,
    imageUrl: 'https://picsum.photos/seed/lamps/400/300',
    rating: 4.3,
    reviewCount: 98,
    inStock: true,
    category: 'Home & Office'
  }],
        category: 'all',
        wishlistItems: [],
    } as EcommerceState),
  
    withComputed(({category, products, wishlistItems}) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') return products();
            return products().filter(p => p.category === category());
        }),
        wishListCount: computed(() => wishlistItems().length)
    })),
    withMethods((store, toaster = inject(Toaster)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });
        }),
        addToWishlist: (product: Product) => {
          const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
            if (!draft.find(p => p.id === product.id)) {
              draft.push(product);
            }
        });
          patchState(store, { wishlistItems: updatedWishlistItems });
          toaster.success(`${product.name} added to wishlist!`);
      },
        removeFromWishlist: (product:Product) => {
          patchState(store, {
            wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)
          });
          toaster.error(`${product.name} removed from wishlist!`);
        },
        clearWishlist: () => {
          patchState(store, { wishlistItems: [] });
        }
    }))
);