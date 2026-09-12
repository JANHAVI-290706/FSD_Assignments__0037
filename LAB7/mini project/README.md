# CartNest — Mini E-Commerce Web Application

> **"Simple Shopping. Smarter Cart."**  
> Full Stack College Project Demonstration using React, Node.js, Express, SQLite, and JWT Authentication.

---

## Project Overview

**CartNest** is a clean, modern, and beginner-friendly mini e-commerce web application built for a college full-stack development assignment. It showcases the core architectural foundations of web development:

- **Frontend**: Functional components, React Hooks (`useState`, `useEffect`, `useMemo`, `useContext`), React Router DOM navigation, dynamic cart calculation, and responsive CSS design without reliance on heavy commercial UI kits.
- **Backend**: RESTful API architecture built on Node.js and Express, SQLite database integration (`better-sqlite3`), secure password hashing (`bcryptjs`), and stateless token authorization (`jsonwebtoken`).
- **Data Integrity**: Atomicity via database transactions, server-side stock validation, and server-side order total recalculation.

---

## Architecture & Technology Stack

```text
┌─────────────────────────────────────────────────────────┐
│                    CartNest Client                      │
│        React (Vite) + React Router + Context API        │
│                Runs on: http://localhost:5173           │
└────────────────────────────┬────────────────────────────┘
                             │  REST API Calls (JSON)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    CartNest Server                      │
│              Express.js + CORS + JWT Auth               │
│                Runs on: http://localhost:5000           │
└────────────────────────────┬────────────────────────────┘
                             │  better-sqlite3 (WAL Mode)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     SQLite Database                     │
│                  server/database.sqlite                 │
│         [users, products, orders, order_items]          │
└─────────────────────────────────────────────────────────┘
```

### Tech Stack Details:
- **Frontend**: React 18, Vite, React Router DOM v6, Custom Responsive CSS
- **Backend**: Node.js, Express.js, CORS, dotenv, bcryptjs, jsonwebtoken
- **Database**: SQLite with `better-sqlite3`

---

## Project Folder Structure

```text
mini-project/
├── server/
│   ├── config/
│   │   └── database.js            # SQLite database connection (WAL mode enabled)
│   ├── controllers/
│   │   ├── authController.js      # Login authentication logic
│   │   ├── orderController.js     # Order placement & retrieval logic
│   │   └── productController.js   # Products retrieval logic
│   ├── database/
│   │   ├── initDatabase.js        # Schema initialization table queries
│   │   ├── seedDatabase.js        # Auto-seeds demo user and 8 products
│   │   └── database.sqlite        # SQLite local database file
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT Bearer token verification
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth routes
│   │   ├── orderRoutes.js         # /api/orders routes
│   │   └── productRoutes.js       # /api/products routes
│   ├── .env                       # Server environment configuration
│   ├── package.json               # Server dependencies & scripts
│   └── server.js                  # Main Express entry point
│
├── client/
│   ├── public/
│   │   ├── favicon.svg            # CartNest brand icon
│   │   └── images/                # Local SVG product illustrations & fallbacks
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem.jsx       # Individual cart item row with stock checks
│   │   │   ├── ErrorMessage.jsx   # Error alert banner with retry action
│   │   │   ├── Footer.jsx         # Global footer
│   │   │   ├── LoadingSpinner.jsx # Animated loading indicator
│   │   │   ├── Navbar.jsx         # Sticky header with cart badge & auth status
│   │   │   ├── ProductCard.jsx    # Product showcase card with stock badge
│   │   │   ├── ProductGrid.jsx    # Responsive grid mapping products
│   │   │   └── ProtectedRoute.jsx # Route guard redirecting to /account
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Authentication state & token management
│   │   │   └── CartContext.jsx    # Global cart state & dynamic calculations
│   │   ├── pages/
│   │   │   ├── Account.jsx        # Login & demo account profile
│   │   │   ├── Cart.jsx           # Two-column cart review & order checkout
│   │   │   ├── Home.jsx           # Landing page with hero & featured items
│   │   │   ├── NotFound.jsx       # 404 handler
│   │   │   ├── Orders.jsx         # User purchase history & receipts
│   │   │   ├── ProductDetails.jsx # Detailed view with quantity selector
│   │   │   └── Products.jsx       # Product catalog with search & category pills
│   │   ├── services/
│   │   │   └── api.js             # Centralized fetch client
│   │   ├── utils/
│   │   │   └── cartUtils.js       # Dynamic totals, item counts & formatting
│   │   ├── App.jsx                # Route hierarchy & navigation routes
│   │   ├── index.css              # Custom responsive design system
│   │   └── main.jsx               # React DOM bootstrap
│   ├── .env                       # Client environment configuration
│   ├── index.html                 # HTML shell
│   ├── package.json               # Client dependencies & scripts
│   └── vite.config.js             # Vite build & dev server configuration
│
└── README.md                      # Project documentation & viva guide
```

---

## Demo Credentials

For the college viva and demonstration, a default demo account is seeded automatically:

| Credential | Value |
| :--- | :--- |
| **Email** | `demo@cartnest.com` |
| **Password** | `demo123` |

> *Tip: An **Auto Fill** button is provided directly on the Account page to effortlessly load credentials during a live presentation.*

---

## Getting Started & Running Locally

### Prerequisites
- **Node.js**: v18 or higher (tested on Node v24)
- **npm**: v9 or higher

---

### Option 1: Run Everything with One Command (Recommended)

From the root directory (`D:\mini project`):
```bash
npm start
```
*(or `npm run dev`)*

This single command concurrently launches:
- Backend server at `http://localhost:5000`
- Frontend client at `http://localhost:5173`

---

### Option 2: Run in Separate Terminals (Standard College Setup)

#### Terminal 1 — Backend Server
```bash
cd server
npm install
npm run dev
```
Runs at: **`http://localhost:5000`**

#### Terminal 2 — Frontend Client
```bash
cd client
npm install
npm run dev
```
Runs at: **`http://localhost:5173`**

---

## REST API Documentation

All API responses follow a consistent JSON structure.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/products` | Retrieve all products | No |
| `GET` | `/api/products/:id` | Retrieve single product details | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `POST` | `/api/orders` | Place a new order & update database stock | **Yes** (Bearer Token) |
| `GET` | `/api/orders` | Retrieve authenticated user's order history | **Yes** (Bearer Token) |

### Sample Order Placement Payload (`POST /api/orders`):
```json
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```

---

## College Viva / Demo Talking Points

When explaining this project to evaluators:

1. **State Management**:
   - `CartContext`: Uses React Context and hooks (`useState`, `useEffect`) to maintain a single source of truth for cart items, persisted in browser `localStorage`.
   - `AuthContext`: Maintains user session state and stores the JWT securely in `localStorage`.
2. **Dynamic Calculations**:
   - Cart subtotal and total are calculated on-the-fly in JavaScript (`cartUtils.js`), preventing stale state.
3. **Security & Integrity**:
   - The frontend never dictates the final order amount. When placing an order, the server verifies current stock and recalculates the total from database prices inside an atomic transaction.
   - Passwords are never stored in plain text; `bcryptjs` salted hashes are utilized.
4. **Client-Side Routing**:
   - `react-router-dom` handles page navigation with `NavLink`, `useParams`, and `useNavigate` without full-page reloads.
5. **Offline Readiness**:
   - All product images are local SVGs stored in `client/public/images/`, ensuring the presentation never fails due to third-party image link rot or internet connectivity drops.
