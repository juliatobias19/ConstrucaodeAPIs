const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
