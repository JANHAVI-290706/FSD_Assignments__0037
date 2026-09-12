const bcrypt = require('bcryptjs');
const db = require('../config/database');
const initDatabase = require('./initDatabase');

function seedDatabase() {
  initDatabase();

  // 1. Seed Demo User
  const demoEmail = 'demo@cartnest.com';
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(demoEmail);

  if (!existingUser) {
    const passwordHash = bcrypt.hashSync('demo123', 10);
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `);
    insertUser.run('Demo User', demoEmail, passwordHash);
    console.log('Seeded demo user: demo@cartnest.com');
  } else {
    console.log('Demo user already exists.');
  }

  // 2. Seed 8 Products
  const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;

  if (productsCount === 0) {
    const products = [
      {
        id: 1,
        name: 'Classic Cotton T-Shirt',
        category: 'Fashion',
        price: 599,
        stock: 25,
        description: 'Comfortable cotton t-shirt suitable for everyday casual wear.',
        image: '/images/tshirt.svg'
      },
      {
        id: 2,
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: 1499,
        stock: 15,
        description: 'Wireless headphones with comfortable ear cushions and clear sound.',
        image: '/images/headphones.svg'
      },
      {
        id: 3,
        name: 'Stainless Steel Water Bottle',
        category: 'Accessories',
        price: 799,
        stock: 30,
        description: 'Reusable stainless steel water bottle suitable for daily use.',
        image: '/images/bottle.svg'
      },
      {
        id: 4,
        name: 'Casual Backpack',
        category: 'Accessories',
        price: 1299,
        stock: 12,
        description: 'Lightweight backpack with multiple compartments for everyday use.',
        image: '/images/backpack.svg'
      },
      {
        id: 5,
        name: 'Smart LED Desk Lamp',
        category: 'Home',
        price: 999,
        stock: 18,
        description: 'Modern LED desk lamp suitable for studying and working.',
        image: '/images/lamp.svg'
      },
      {
        id: 6,
        name: 'Ceramic Coffee Mug',
        category: 'Home',
        price: 349,
        stock: 40,
        description: 'Minimal ceramic mug for coffee, tea, and everyday beverages.',
        image: '/images/mug.svg'
      },
      {
        id: 7,
        name: 'Running Shoes',
        category: 'Fashion',
        price: 1999,
        stock: 10,
        description: 'Comfortable running shoes designed for walking and everyday activities.',
        image: '/images/shoes.svg'
      },
      {
        id: 8,
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: 699,
        stock: 20,
        description: 'Compact wireless mouse suitable for laptops and desktop computers.',
        image: '/images/mouse.svg'
      }
    ];

    const insertProduct = db.prepare(`
      INSERT INTO products (id, name, category, price, stock, description, image)
      VALUES (@id, @name, @category, @price, @stock, @description, @image)
    `);

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertProduct.run(item);
      }
    });

    insertMany(products);
    console.log(`Seeded ${products.length} products.`);
  } else {
    console.log(`Products already exist (${productsCount} found).`);
  }
}

module.exports = seedDatabase;

if (require.main === module) {
  seedDatabase();
}
