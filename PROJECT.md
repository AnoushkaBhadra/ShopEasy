# ShopEasy – E-Commerce & Shopping App

## Overview
ShopEasy is a React Native-based e-commerce application that allows users to browse products, manage a cart, authenticate securely, and place orders. The app uses JWT-based authentication, persistent storage, and an external e-commerce API for product data.

---

## Features
- User Authentication (Login/Signup using JWT)
- Product Listing (fetched from external API)
- Product Details Page
- Shopping Cart (local persistence)
- Checkout (Protected Route)
- Order History (Protected Route)
- Camera-based image capture (profile/product demo feature)
- Orientation-aware product gallery UI

---

## Tech Stack
- React Native (Expo)
- AsyncStorage (local persistence)
- React Navigation (Stack + Tabs)
- Fetch API / Axios
- JSON Server (optional backend simulation)
- Expo Camera / Image Picker

---

## Architecture (DFD)

### Level 0 DFD (Context Diagram)
```
+------------------+
| User |
+--------+---------+
| 
v
+---------------------------+
| ShopEasy App |
| - Auth |
| - Products |
| - Cart |
| - Orders |
+------------+-------------+
| 
v
External API / Backend
(Products + Orders + Auth)
```

---

### Level 1 DFD
```
User
|
v
[Authentication Module] -----> JWT Token ----+
| |
v v
[Product Module] <---- API Fetch ---- External Product API
|
v
[Cart Module] ---- AsyncStorage (local persistence)
|
v
[Checkout Module] -----> Orders API (protected)
|
v
[Order History Module] <--- Orders API
```

---

## Database Design (Tables / Collections)

### 1. Users
```
## users
id (PK)
name
email
password_hash
created_at
```

---

### 2. Products
```
## products
id (PK)
title
description
price
category
image_url
rating
```

---

### 3. Cart
```
## cart
id (PK)
user_id (FK)
product_id (FK)
quantity
added_at
```

---

### 4. Orders
```
## orders
id (PK)
user_id (FK)
total_amount
status (pending/paid/shipped/delivered)
created_at
```

---

### 5. Order Items
```
## order_items
id (PK)
order_id (FK)
product_id (FK)
quantity
price
```

---

### 6. (Optional) Saved Images / Profile Media
```
## media
id (PK)
user_id (FK)
image_uri
type (profile/product_demo)
created_at
```

---
# API Endpoints

Base URL

```
http://<YOUR_IP>:3000
```

---

## Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Register a new user |
| PUT | `/users/:id` | Replace user details |
| PATCH | `/users/:id` | Update user details |
| DELETE | `/users/:id` | Delete user |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product details |


---

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| GET | `/categories/:id` | Get category |


---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get cart items |
| GET | `/cart/:id` | Get cart item |
| POST | `/cart` | Add item to cart |
| PATCH | `/cart/:id` | Update quantity |
| DELETE | `/cart/:id` | Remove item from cart |

---

## Wishlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wishlist` | Get wishlist |
| POST | `/wishlist` | Add to wishlist |
| PATCH | `/wishlist/:id` | Update wishlist item |
| DELETE | `/wishlist/:id` | Remove from wishlist |

---

## Favorites

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorites` | Get favorites |
| POST | `/favorites` | Add favorite |
| PATCH | `/favorites/:id` | Update favorite |
| DELETE | `/favorites/:id` | Remove favorite |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get all orders |
| GET | `/orders/:id` | Get order details |
| POST | `/orders` | Place order |
| PATCH | `/orders/:id` | Update order status |
| DELETE | `/orders/:id` | Delete order |

---

## Addresses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/addresses` | Get saved addresses |
| GET | `/addresses/:id` | Get address |
| POST | `/addresses` | Add new address |
| PATCH | `/addresses/:id` | Update address |
| DELETE | `/addresses/:id` | Delete address |

---
]
---

## Key Design Notes
- Products are API-driven (no hardcoding)
- Cart stored locally for offline usability
- Orders and checkout require authentication
- Protected routes enforced using JWT state check
- Images handled via URI storage or external URLs
- Orientation handling applied to product gallery for responsive UI

---

## Security
- JWT authentication for session control
- Protected routes for checkout and order history
- Token stored in AsyncStorage
- API requests include Authorization header

---

## Assumptions
- External API used for product catalog (e.g., Fake Store API)
- Backend may be simulated using JSON Server
- Image uploads are optional and handled via device camera


## Backend Configuration

### 1. Create a `.env` file

Create a `.env` file in the project root.

Example:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000
```

### 2. Set the backend URL

- Android Emulator:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

- Expo Go (Physical Device):

```env
EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:5000
```

Replace `<YOUR_LOCAL_IP>` with your computer's IPv4 address.

### 3. Restart Expo

```bash
npx expo start -c
```

### 4. Start the backend

```bash
cd backend
npm start
```

### 5. Start JSON Server

```bash
npx json-server backend/db.json --port 3000
```

---

# Navigation Architecture

The application uses a combination of **Stack Navigation**, **Drawer Navigation**, and **Bottom Tab Navigation** to separate authentication, shopping, and utility features.

```
RootStack
│
├── WelcomeScreen
│
├── AuthStack
│   ├── LoginScreen
│   └── RegistrationScreen
│
└── AppDrawer
    │
    ├── ShopEasy
    │   │
    │   └── AppStack
    │       │
    │       ├── AppTabs
    │       │   ├── HomeScreen
    │       │   ├── CartScreen
    │       │   └── ProfileScreen
    │       │
    │       ├── ProductDetailsScreen
    │       ├── SearchResultsScreen
    │       ├── CheckoutScreen
    │       ├── AddressSelectionScreen
    │       ├── PaymentScreen
    │       ├── OrderConfirmationScreen
    │       ├── OrderHistoryScreen
    │       ├── QRScannerScreen
    │       └── ImagePickerScreen
    │
    ├── OrdersScreen
    ├── SettingsScreen
    ├── SavedAddressesScreen
    └── HelpSupportScreen
```

### Navigation Components

| Component | Purpose |
|-----------|---------|
| **RootStack** | Root navigator that decides whether the user enters the authentication flow or the main application. |
| **AuthStack** | Contains all authentication-related screens. |
| **AppDrawer** | Provides global navigation to Orders, Settings, Saved Addresses, and Help & Support. |
| **AppStack** | Handles the main shopping flow and screens that are pushed on top of the bottom tabs. |
| **AppTabs** | Bottom tab navigation for the three primary sections: Home, Cart, and Profile. |

---

# Screen Structure

## Authentication

| Screen | Purpose |
|---------|---------|
| **WelcomeScreen** | Initial landing screen with options to Login or Register. |
| **LoginScreen** | Authenticates existing users and stores the JWT token. |
| **RegistrationScreen** | Registers a new user account. |

---

## Home

| Screen | Purpose |
|---------|---------|
| **HomeScreen** | Displays the product catalogue fetched from the API. |
| **ProductDetailsScreen** | Displays detailed information about a selected product. |
| **SearchResultsScreen** | Displays products matching the user's search or filters. |

---

## Cart & Checkout

| Screen | Purpose |
|---------|---------|
| **CartScreen** | Displays cart items, quantities, and total price. |
| **CheckoutScreen** | Collects order details and begins the checkout process. |
| **AddressSelectionScreen** | Allows users to choose a delivery address manually or using the map. |
| **PaymentScreen** | Handles payment method selection and payment confirmation. |
| **OrderConfirmationScreen** | Displays successful order placement details. |

---

## Orders

| Screen | Purpose |
|---------|---------|
| **OrdersScreen** | Displays all current and previous orders from the drawer menu. |
| **OrderHistoryScreen** | Displays the authenticated user's completed order history. |

---

## Profile

| Screen | Purpose |
|---------|---------|
| **ProfileScreen** | Displays user profile information and account settings. |
| **ImagePickerScreen** | Allows the user to select or capture a profile image. |

---

## Scanner

| Screen | Purpose |
|---------|---------|
| **QRScannerScreen** | Opens the device camera to scan QR codes or product barcodes. |

---

## Settings

| Screen | Purpose |
|---------|---------|
| **SettingsScreen** | Allows users to configure application preferences and account settings. |

---

## Address

| Screen | Purpose |
|---------|---------|
| **SavedAddressesScreen** | Displays and manages previously saved delivery addresses. |

---

## Support

| Screen | Purpose |
|---------|---------|
| **HelpSupportScreen** | Provides FAQs, contact information, and support resources. |
