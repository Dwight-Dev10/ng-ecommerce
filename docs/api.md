# NgEcommerce API Documentation

## Current API Status
- The application currently uses in-memory product and state data inside `src/app/ecommerce-store.ts`.
- There is no implemented backend API in this repository.
- `src/app/services/ProductService.ts` contains a placeholder HTTP call to `https://localhost:5001/api/products`.
- This backend endpoint is not available in this project, so product loading from the network is not active.

## Planned Backend Architecture
- The backend will be implemented as an ASP.NET Core Web API using .NET 10.
- Entity Framework Core will provide data access and ORM support.
- The frontend is designed to consume REST-style API endpoints once the backend is ready.

## Planned API Contract
The app is designed to support a REST-style backend once the API is implemented.

### GET /api/products
- Description: Retrieve the full product catalog.
- Response: `Product[]`
- Example product schema:
  ```ts
  {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: string;
    reviews: UserReview[];
  }
  ```

### GET /api/products/{productId}
- Description: Retrieve detailed information for a single product.
- Response: `Product`

### POST /api/orders
- Description: Submit a new order.
- Request body:
  ```ts
  {
    userId: string;
    items: CartItem[];
    paymentMethod?: string;
    shippingAddress?: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }
  ```
- Response:
  ```ts
  {
    id: string;
    total: number;
    paymentStatus: 'success' | 'failure';
  }
  ```

### POST /api/auth/signin
- Description: Authenticate an existing user.
- Request body:
  ```ts
  {
    email: string;
    password: string;
  }
  ```
- Response: `User`

### POST /api/auth/signup
- Description: Register a new user.
- Request body:
  ```ts
  {
    name: string;
    email: string;
    password: string;
  }
  ```
- Response: `User`

## Data Models

### Product
```ts
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  reviews: UserReview[];
};
```

### CartItem
```ts
export type CartItem = {
  product: Product;
  quantity: number;
};
```

### User
```ts
export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};
```

### Order
```ts
export type Order = {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
  paymentStatus: 'success' | 'failure';
};
```

### UserReview
```ts
export type UserReview = {
  id: string;
  productId: string;
  UserName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};
```

## Implementation Notes
- `ProductService` currently only defines `getProducts()`.
- The app should add additional service methods for product detail, order submission, auth, and reviews when a real backend is available.
- Authentication and checkout behavior are currently mocked inside `EcommerceStore`.
- The app is ready for API integration using Angular's `HttpClient` once backend endpoints are available.
