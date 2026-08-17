import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* =========================
   PRODUCTS
========================= */

const products = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    price: 499,
    oldPrice: 999,
    category: "Fashion",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description:
      "Comfortable cotton t-shirt for everyday wear.",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 1499,
    oldPrice: 2999,
    category: "Footwear",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "Lightweight running shoes for everyday activities.",
  },
  {
    id: 3,
    name: "Travel Backpack",
    price: 899,
    oldPrice: 1799,
    category: "Bags",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description:
      "Spacious backpack suitable for college and travel.",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 1999,
    oldPrice: 3999,
    category: "Electronics",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "Wireless headphones with clear sound and comfortable cushions.",
  },
  {
    id: 5,
    name: "Classic Watch",
    price: 2499,
    oldPrice: 4999,
    category: "Accessories",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description:
      "Elegant watch suitable for casual and formal occasions.",
  },
  {
    id: 6,
    name: "Comfort Hoodie",
    price: 999,
    oldPrice: 1999,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description:
      "Warm and comfortable hoodie for everyday use.",
  },
];

/* =========================
   HEADER
========================= */

function Header({ cart, search, setSearch }) {
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate("/products");
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        CartNova<span></span>
      </Link>

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit"></button>
      </form>

      <nav>
        <Link to="/login" className="login">
          Login
        </Link>

        <Link to="/products">Products</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/cart" className="cart-link">
           Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

/* =========================
   CATEGORIES
========================= */

function Categories() {
  return (
    <div className="categories">
      <Link to="/products"> All</Link>
      <Link to="/products"> Fashion</Link>
      <Link to="/products"> Footwear</Link>
      <Link to="/products"> Bags</Link>
      <Link to="/products"> Electronics</Link>
      <Link to="/products"> Accessories</Link>
    </div>
  );
}

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <div className="product-info">
        <p className="category">
          {product.category}
        </p>

        <h3
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
        >
          {product.name}
        </h3>

        <div className="rating">
          {product.rating} 
        </div>

        <div className="price">
          ₹{product.price}
          <span>
            ₹{product.oldPrice}
          </span>
        </div>

        <p className="discount">
          {Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          )}
          % off
        </p>

        <div className="buttons">
          <button
            className="add-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="buy-now"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   HOME
========================= */

function Home({ addToCart }) {
  return (
    <>
      <Categories />

      <section className="hero">
        <div>
          <p>BIG SALE</p>

          <h1>
            Great Deals
            <br />
            Every Day
          </h1>

          <p>
            Shop your favourite products
            at amazing prices.
          </p>

          <Link
            to="/products"
            className="shop-now"
          >
            Shop Now
          </Link>
        </div>

        <div className="hero-icon">
          
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <div>
            <h2>Deals of the Day</h2>
            <p>Best products at great prices</p>
          </div>

          <Link to="/products">
            View All →
          </Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}

/* =========================
   PRODUCTS
========================= */

function Products({ addToCart, search }) {
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Categories />

      <section className="section">
        <h1>All Products</h1>

        <p className="description">
          Explore our latest collection.
        </p>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try another search.</p>
          </div>
        )}
      </section>
    </>
  );
}

/* =========================
   PRODUCT DETAILS
========================= */

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>

        <button
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />

        <div className="details-buttons">
          <button
            className="add-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="buy-now"
            onClick={() =>
              alert("Order placed successfully!")
            }
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="details-info">
        <p className="category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <div className="rating">
          {product.rating} ★
        </div>

        <h2>₹{product.price}</h2>

        <p className="old-price">
          ₹{product.oldPrice}
        </p>

        <p className="discount">
          {Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          )}
          % off
        </p>

        <hr />

        <h3>Product Description</h3>

        <p className="details-description">
          {product.description}
        </p>

        <div className="delivery">
           Free Delivery
          <br />
           Delivery in 3-5 days
          <br />
           Secure Shopping
        </div>

        <button
          className="back"
          onClick={() =>
            navigate("/products")
          }
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
}

/* =========================
   CART
========================= */

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div></div>

        <h1>Your Cart is Empty</h1>

        <p>
          Add some products to start shopping.
        </p>

        <Link to="/products">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h1>My Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>

                <p className="category">
                  {item.category}
                </p>

                <h2>₹{item.price}</h2>

                <div className="quantity">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h2>Price Details</h2>

          <div>
            <span>Items</span>
            <span>
              {cart.reduce(
                (sum, item) =>
                  sum + item.quantity,
                0
              )}
            </span>
          </div>

          <div>
            <span>Delivery</span>
            <span className="free">
              FREE
            </span>
          </div>

          <hr />

          <div className="total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>

          <button
            onClick={() =>
              alert(
                "Checkout feature coming soon!"
              )
            }
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================
   ABOUT
========================= */

function About() {
  return (
    <div className="simple-page">
      <h1>About ShopZone</h1>

      <p>
        ShopZone is a simple online shopping
        application created using React.
      </p>

      <p>
        This project demonstrates components,
        routing, state management and shopping
        cart functionality.
      </p>
    </div>
  );
}

/* =========================
   CONTACT
========================= */

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          onClick={() =>
            alert("Login feature coming soon!")
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>ABOUT</h3>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      <div>
        <h3>HELP</h3>
        <Link to="/products">Shopping</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div>
        <h3>POLICY</h3>
        <Link to="/about">Terms</Link>
        <Link to="/about">Privacy</Link>
      </div>

      <div>
        <h3>SHOPZONE</h3>
        <p>Your online shopping destination.</p>
      </div>

      <p className="copyright">
         2026 CartNova. All rights reserved.
      </p>
    </footer>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  return (
    <BrowserRouter>
      <Header
        cart={cart}
        search={search}
        setSearch={setSearch}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home addToCart={addToCart} />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
                search={search}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={
                  removeFromCart
                }
                increaseQuantity={
                  increaseQuantity
                }
                decreaseQuantity={
                  decreaseQuantity
                }
              />
            }
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;