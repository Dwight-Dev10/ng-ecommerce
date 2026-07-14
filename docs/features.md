# NgEcommerce Features

## Product Catalog
- Displays a catalog of products grouped by category.
- Category navigation is available in a left-side drawer on the products grid page.
- Categories include `all`, `Electronics`, `Clothing`, `Home & Kitchen`, `Fitness`, `Accessories`, and `Home & Office`.
- The product card shows:
  - product image
  - product name
  - price
  - rating and review count
  - stock availability
- Users can click a product card to view detailed product information.

## Product Details
- Product detail page shows:
  - image and gallery-style display
  - full product title and description
  - price and stock status
  - category badge
  - review summary and latest customer reviews
  - quantity selector and add-to-cart action
  - wishlist toggle button
- Product reviews are sorted by date with the newest reviews first.
- Signed-in users can open a review form to write a review.

## Shopping Cart
- The cart page includes:
  - a list of cart items
  - item quantity controls
  - item removal controls
  - wishlist tease section
  - order summary with subtotal, tax, and total
  - `Proceed to Checkout` action
- `Summarize Order` is a reusable panel that calculates subtotal, tax (7%), and total.
- Cart item count and total quantity are computed in the store.

## Wishlist
- Users can add products to a wishlist from both the product grid and product detail pages.
- The wishlist page includes:
  - product cards for each saved item
  - remove item controls
  - clear wishlist action
- Wishlist items can be moved into the cart from the wishlist page.

## Checkout Process
- Checkout page provides a simple checkout interface with:
  - shipping information form
  - payment options form
  - order summary panel
  - `Place Order` button
- Order placement is simulated in the store with a 1 second delay.
- After a successful order, the cart is cleared and the user is navigated to the order success page.

## Authentication
- The app includes sign-in and sign-up modal dialogs.
- `EcommerceStore` supports local sign-in/up state with a mocked `User` object.
- Checkout navigation requires a signed-in user. If unsigned, a sign-in dialog opens before proceeding.
- Sign-out clears the current user session.

## Reviews
- Users can open a review form for the current product.
- The store supports adding reviews and toggling review form visibility.
- Review data exists as part of each product model.

## UI/UX
- Uses Angular Material for controls and dialogs.
- Provides toast notifications for cart, wishlist, auth, and order actions.
- Uses standalone components and Angular router with view transition support.
- The layout is optimized for responsive browsing with a sidebar category menu and product cards.

## Progress and Limits
- Product data is currently seeded in the app store, making the app fully functional without a backend.
- The API layer is not implemented yet; the app currently does not fetch product data from a real backend.
- The checkout and payment form UI is present, but payment processing is mocked.
