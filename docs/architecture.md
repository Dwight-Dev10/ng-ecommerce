# NgEcommerce Architecture

## Overview
NgEcommerce is a modern Angular 21 storefront built with standalone components, Angular Signals, and server-side rendering support. The app is designed as a lightweight single-page application with client-side navigation, state management using `@ngrx/signals`, and a mock data-driven product catalog.

## Application Structure
- `src/app/app.ts`
  - Root application component.
  - Renders the global header and `router-outlet`.
- `src/app/app.routes.ts`
  - Defines the route configuration using lazy-loaded standalone pages.
  - Primary routes:
    - `/products/:category`
    - `/wishlist`
    - `/cart`
    - `/checkout`
    - `/product/:productId`
    - `/order-success`
- `src/app/app.config.ts`
  - Provides Angular application-wide providers.
  - Configures router, HTTP client, hot toast notifications, Angular Material defaults, and hydration support.
- `src/app/app.config.server.ts`
  - Extends the client config with server rendering providers.

## State Management
- `src/app/ecommerce-store.ts`
  - Central application store implemented with `signalStore` from `@ngrx/signals`.
  - Holds main state slices:
    - `products`
    - `category`
    - `wishlistItems`
    - `cartItems`
    - `user`
    - `selectedProductId`
    - `loading`
    - `writeReview`
  - Includes computed values:
    - `filteredProducts`
    - `wishListCount`
    - `cartCount`
    - `selectedProduct`
  - Exposes methods for business actions:
    - `setCategory`
    - `setProductId`
    - `addToWishlist`
    - `removeFromWishlist`
    - `clearWishlist`
    - `addToCart`
    - `setItemQuantity`
    - `addAllWishlistToCart`
    - `moveToWishlist`
    - `removeFromCart`
    - `proceedToCheckout`
    - `placeOrder`
    - `signIn`
    - `signUp`
    - `signOut`
    - `showWriteReview`
    - `hideWriteReview`
    - `addReview`
  - Uses `immer` to update arrays immutably.

## Models
- `src/app/models/product.ts`
  - Product shape includes `id`, `name`, `description`, `price`, `imageUrl`, `rating`, `reviewCount`, `inStock`, `category`, and associated reviews.
- `src/app/models/cart.ts`
  - `CartItem` includes `product` and `quantity`.
- `src/app/models/user.ts`
  - `User` shape includes `id`, `name`, `email`, and `imageUrl`.
  - Sign-in/sign-up payload types are defined here.
- `src/app/models/orders.ts`
  - `Order` structure includes `id`, `userId`, `total`, `items`, and `paymentStatus`.
- `src/app/models/user-review.ts`
  - Defines individual product review metadata.

## Component Architecture
- Standalone components are used throughout the app rather than NgModules.
- Key layout and UI components:
  - `src/app/layout/header/header.ts` — global header with navigation and action controls.
  - `src/app/components/product-card/product-card.ts` — product preview card.
  - `src/app/components/toggle-wishlist-button/toggle-wishlist-button.ts` — wishlist toggle button.
  - `src/app/components/summarize-order/summarize-order.ts` — order summary panel used in cart and checkout.
  - `src/app/components/qty-selector/qty-selector.ts` — quantity adjustment control.
  - `src/app/components/sign-in-dialog/sign-in-dialog.ts` and `sign-up-dialog.ts` — modal dialog components for authentication.

## Page Flow
- Product browsing is driven by `ProductsGrid` and route parameter category filtering.
- Product detail is shown in `ViewProductDetail` and includes product info, stock status, and reviews.
- Wishlist, cart, checkout, and order success pages each have dedicated standalone pages.

## Routing and Navigation
- Routes are defined with lazy-loaded standalone page components.
- Category selection uses route segments such as `/products/electronics`.
- The default route redirects to `/products/all`.
- The cart page can route the user to checkout, and order completion navigates to `/order-success`.

## API and Data
- The app is currently built on in-memory product data inside `EcommerceStore`.
- There is a placeholder `ProductService` that currently points to `https://localhost:5001/api/products`, but this backend API is not implemented in this repository.
- All product, cart, wishlist, and auth flows are currently handled locally in the signal store.

## UI and Styling
- Uses Angular Material components and custom Tailwind-inspired utility classes.
- Uses view transitions for product image navigation and wishlist button animations.
- Includes SSR support with `@angular/ssr` and hydration.

## SSR Support
- `angular.json` build options include `server` and `ssr.entry` for server rendering.
- `src/app/app.config.server.ts` enables server rendering with route support.
- `app.config.ts` includes browser hydration and event replay.

## Notes
- The application is structured for easy extension to a real backend.
- The `EcommerceStore` can be updated to load products from `ProductService` once an API is available.
- `withStorageSync` is currently commented out and could be enabled for local persistence of cart and wishlist state.
