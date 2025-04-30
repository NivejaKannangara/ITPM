
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../config/multer');


router.post('/', upload.single('productImage'), productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', upload.single('productImage'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;  