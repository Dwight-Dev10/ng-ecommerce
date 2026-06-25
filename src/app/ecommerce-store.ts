import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, 
        withComputed, withMethods, withState } from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import SignInDialog from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/orders";
import { withStorageSync} from "@angular-architects/ngrx-toolkit"
import { AddReviewParams, UserReview } from "./models/user-review";

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;

    loading: boolean;
    selectedProductId: string | undefined;

    writeReview: boolean;

};


/* `EcommerceStore` is a signal store in Angular using `@ngrx/signals` library. It defines
the state of an e-commerce application including products, category, and wishlist
items. It initializes the state with a list of products and provides computed
properties for filtered products based on the selected  category and the count of items
in the wishlist. */
export const EcommerceStore = signalStore(
    {
        providedIn: 'root', //primary way to define a service in Angular that is available globally throughout your application
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
    category: 'Electronics',
    reviews: [
      {
        id: 'r1-1',
        productId: 'p1',
        UserName: 'Ava M.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
        title: 'Fantastic sound quality',
        comment: 'These headphones are comfortable and the noise cancellation is amazing.',
        reviewDate: new Date('2026-05-14')
      },
      {
        id: 'r1-2',
        productId: 'p1',
        UserName: 'Noah S.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
        rating: 4,
        title: 'Great value for the price',
        comment: 'Battery life lasts all day and the audio is crisp.',
        reviewDate: new Date('2026-04-09')
      }
    ]
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
    category: 'Electronics',
    reviews: [
      {
        id: 'r2-1',
        productId: 'p2',
        UserName: 'Mia W.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
        rating: 4,
        title: 'Helpful workout tracking',
        comment: 'The sleep monitoring feature is surprisingly accurate.',
        reviewDate: new Date('2026-03-22')
      }
    ]
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
    category: 'Clothing',
    reviews: [
      {
        id: 'r3-1',
        productId: 'p3',
        UserName: 'Liam K.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        rating: 5,
        title: 'Very comfortable',
        comment: 'These sneakers fit well and feel great for walking around town.',
        reviewDate: new Date('2026-02-08')
      }
    ]
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
    category: 'Clothing',
    reviews: [
      {
        id: 'r4-1',
        productId: 'p4',
        UserName: 'Sophia P.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
        rating: 4,
        title: 'Stylish and warm',
        comment: 'This jacket is cute and fits nicely over sweaters.',
        reviewDate: new Date('2026-04-30')
      }
    ]
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
    category: 'Home & Kitchen',
    reviews: [
      {
        id: 'r5-1',
        productId: 'p5',
        UserName: 'Ethan G.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        rating: 5,
        title: 'Keeps drinks cold',
        comment: 'I used it all day and my drink stayed cold for hours.',
        reviewDate: new Date('2026-05-02')
      }
    ]
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
    category: 'Electronics',
    reviews: [
      {
        id: 'r6-1',
        productId: 'p6',
        UserName: 'Oliver B.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
        rating: 4,
        title: 'Smooth and responsive',
        comment: 'The buttons are responsive and the RGB looks great on my desk.',
        reviewDate: new Date('2026-01-18')
      }
    ]
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
    category: 'Electronics',
    reviews: [
      {
        id: 'r7-1',
        productId: 'p7',
        UserName: 'Isabella R.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        rating: 5,
        title: 'Beautiful display',
        comment: 'Colors are vivid and the screen is very crisp.',
        reviewDate: new Date('2026-03-11')
      }
    ]
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
    category: 'Home & Kitchen',
    reviews: [
      {
        id: 'r8-1',
        productId: 'p8',
        UserName: 'Emma T.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
        rating: 4,
        title: 'Easy to use',
        comment: 'My morning coffee is ready in minutes and it tastes great.',
        reviewDate: new Date('2026-04-07')
      }
    ]
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
    category: 'Fitness',
    reviews: [
      {
        id: 'r9-1',
        productId: 'p9',
        UserName: 'Harper L.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        rating: 5,
        title: 'Great grip',
        comment: 'This mat never slips during my practice and is very comfortable.',
        reviewDate: new Date('2026-01-30')
      }
    ]
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
    category: 'Accessories',
    reviews: [
      {
        id: 'r10-1',
        productId: 'p10',
        UserName: 'Lucas H.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
        rating: 4,
        title: 'Roomy and sturdy',
        comment: 'Holds my laptop and travel items well, with good padding.',
        reviewDate: new Date('2026-02-21')
      }
    ]
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
    category: 'Electronics',
    reviews: [
      {
        id: 'r11-1',
        productId: 'p11',
        UserName: 'Avery N.',
        userImageUrl: 'https://randomuser.me/api/portraits/men/39.jpg',
        rating: 4,
        title: 'Convenient charging',
        comment: 'Works well with my phone and charges quickly.',
        reviewDate: new Date('2026-03-05')
      }
    ]
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
    category: 'Home & Office',
    reviews: [
      {
        id: 'r12-1',
        productId: 'p12',
        UserName: 'Chloe F.',
        userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
        rating: 5,
        title: 'Perfect desk light',
        comment: 'The brightness settings are great and the USB port is handy.',
        reviewDate: new Date('2026-04-16')
      }
    ]
  }],
        category: 'all',
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false
    } as EcommerceState),

    withStorageSync({ 
      key: 'modern-store',
      select: ({wishlistItems, cartItems, user}) => ({wishlistItems, cartItems, user }),
      }),
  
    withComputed(({category, products, wishlistItems, cartItems, selectedProductId}) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') return products();
            return products().filter(p => p.category === category());
        }),
        wishListCount: computed(() => wishlistItems().length),
        cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()))
    })),

    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
        setCategory: signalMethod<string>((category: string) => {
          patchState(store, { category });
        }),

        setProductId: signalMethod<string>((productId: string) => {
          patchState(store, { selectedProductId: productId });
        }),

        // Add to wishlist
        addToWishlist: (product: Product) => {
          const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
            if (!draft.find(p => p.id === product.id)) {
              draft.push(product);
            }
        });
          patchState(store, { wishlistItems: updatedWishlistItems });
          toaster.success(`${product.name} added to wishlist!`);
        },
      // Remove from wishlist
        removeFromWishlist: (product:Product) => {
          patchState(store, {
            wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)
          });
          toaster.error(`${product.name} removed from wishlist!`);
        },
        // Clear wishlist
        clearWishlist: () => {
          patchState(store, { wishlistItems: [] });
        },
        addToCart: (product: Product, quantity = 1) => {  
          const existingCartItem = store.cartItems().findIndex(item => item.product.id === product.id);
          // Produce will give us an immutable update to the cart items array
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            
            if (existingCartItem !== -1) {
              draft[existingCartItem].quantity += quantity;
            } else {
              draft.push({ product, quantity });
            }
          });

          patchState(store, { cartItems: updatedCartItems });
          toaster.success(existingCartItem ===-1 ? `${product.name} added to cart!` : `${product.name} product already in cart!`);
        },

        setItemQuantity(params: { productId: string, quantity: number}){
          const index = store.cartItems().findIndex(item => item.product.id === params.productId);
          const update = produce(store.cartItems(), (draft) => {
            draft[index].quantity = params.quantity;
          });
          patchState(store, { cartItems: update });
        },

        addAllWishlistToCart: () => {
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            store.wishlistItems().forEach(p => {
              if(!draft.find(c => c.product.id === p.id)){
                draft.push({ product: p, quantity: 1 });
              }
            })
          });
          patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
        },

        moveToWishlist:(product: Product) =>{
          const updatedCartItems = store.cartItems().filter(p => p.product.id !== product.id);
          const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
            if (!draft.find(p => p.id === product.id)) {
              draft.push(product);
            }
        });

          patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
        },

        removeFromCart: (product: Product) => {
          patchState(store, {
            cartItems: store.cartItems().filter(p => p.product.id !== product.id)
          });
        },

        proceedToCheckout: () => {
          if(!store.user()){
            matDialog.open(SignInDialog, {
              disableClose: true,
              data: { checkout: true}
            });
            return;
          }
          router.navigate(['/checkout']);
        },

        placeOrder: async () => {
          patchState(store, { loading: true });
          
          const user = store.user();
          if (!user) {
            toaster.error('You must be signed in to place an order.');
            patchState(store, { loading: false });
            return;
          }


          const order: Order = {
            id: crypto.randomUUID(),
            userId: user.id,
            total: Math.round(store.cartItems()
                  .reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
            items: store.cartItems(),
            paymentStatus: 'success',
          };

          await new Promise((resolve) => setTimeout(resolve, 1000));

          patchState(store, { cartItems: [], loading: false });
          router.navigate(['order-success'])
          toaster.success('Order placed successfully!');
        },

        signIn: ({email, password, checkout, dialogId}: SignInParams) => {
          patchState(store, {user: {
            id: '1',
            name: 'John Doe',
            email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          }});
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }
        },


        signOut: () => {
          patchState(store, {user: undefined});
        },


        signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
          patchState(store, {user: {
            id: '1',
            name: 'John Doe',
            email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          }});
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }
        },

        showWriteReview: () => {
          patchState(store, { writeReview: true });
        },
        
        hideWriteReview: () => {
          patchState(store, { writeReview: false });
        },

        addReview: async ({title, comment, rating}: AddReviewParams) => {
          patchState(store, { 
          loading: true });
          const productId = store.products().find(p => p.id === store.selectedProductId());

          if (!productId) {
            toaster.error('Product not found.');
            patchState(store, { loading: false });
            return;
          }

          const newReview: UserReview = {
            id: crypto.randomUUID(),
            productId: productId.id,
            UserName: store.user()?.name || 'Anonymous',
            userImageUrl: store.user()?.imageUrl || '',
            rating,
            title,
            comment,
            reviewDate: new Date(),
          };

          const updatedProducts = produce(store.products(), (draft) => {
            const productIndex = draft.findIndex(p => p.id === productId.id);
            draft[productIndex].reviews.push(newReview);
            draft[productIndex].rating = Math.round((draft[productIndex].reviews.reduce((acc, r) => acc + r.rating, 0) 
                                                    / draft[productIndex].reviews.length) * 10) / 10;
            draft[productIndex].reviewCount = draft[productIndex].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, {loading: false, products: updatedProducts, writeReview: false});
      },
      
        
    }))
);