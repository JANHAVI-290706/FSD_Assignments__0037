const db = require('../config/database');

exports.getAllProducts = (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
    return res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to load products. Please try again.'
    });
  }
};

exports.getProductById = (req, res) => {
  try {
    const productId = req.params.id;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to load product. Please try again.'
    });
  }
};
