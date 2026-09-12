const db = require('../config/database');

exports.placeOrder = (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Add products before placing an order.'
      });
    }

    // Prepare queries
    const getProductStmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const updateStockStmt = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
    const insertOrderStmt = db.prepare('INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)');
    const insertOrderItemStmt = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Execute within a transaction
    const executeOrderTransaction = db.transaction(() => {
      let calculatedTotal = 0;
      const verifiedItems = [];

      for (const item of items) {
        const productId = item.productId || item.id;
        const quantity = parseInt(item.quantity, 10);

        if (!productId || isNaN(quantity) || quantity <= 0) {
          throw new Error('INVALID_ITEM_DATA');
        }

        const product = getProductStmt.get(productId);
        if (!product) {
          throw new Error('PRODUCT_NOT_FOUND');
        }

        if (product.stock < quantity) {
          throw new Error('INSUFFICIENT_STOCK');
        }

        const subtotal = product.price * quantity;
        calculatedTotal += subtotal;

        verifiedItems.push({
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price,
          subtotal
        });
      }

      // Insert order
      const orderResult = insertOrderStmt.run(userId, calculatedTotal, 'Placed');
      const orderId = orderResult.lastInsertRowid;

      // Insert order items & update stock
      for (const item of verifiedItems) {
        insertOrderItemStmt.run(
          orderId,
          item.productId,
          item.productName,
          item.quantity,
          item.price,
          item.subtotal
        );
        updateStockStmt.run(item.quantity, item.productId);
      }

      return {
        id: orderId,
        total_amount: calculatedTotal,
        status: 'Placed'
      };
    });

    let newOrder;
    try {
      newOrder = executeOrderTransaction();
    } catch (txError) {
      if (txError.message === 'INSUFFICIENT_STOCK') {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock for this product'
        });
      } else if (txError.message === 'PRODUCT_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      } else if (txError.message === 'INVALID_ITEM_DATA') {
        return res.status(400).json({
          success: false,
          message: 'Please select a valid quantity.'
        });
      }
      throw txError;
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
};

exports.getOrders = (req, res) => {
  try {
    const userId = req.user.id;

    const orders = db.prepare(`
      SELECT id, user_id, total_amount, status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY id DESC
    `).all(userId);

    const getItemsStmt = db.prepare(`
      SELECT id, product_id, product_name, quantity, price, subtotal
      FROM order_items
      WHERE order_id = ?
      ORDER BY id ASC
    `);

    const ordersWithItems = orders.map((order) => {
      const items = getItemsStmt.all(order.id);
      return {
        ...order,
        items
      };
    });

    return res.status(200).json({
      success: true,
      orders: ordersWithItems
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
};
