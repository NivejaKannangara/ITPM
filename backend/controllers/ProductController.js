/*const Product = require("../Model/ProductModel");

//data display
const getAllProducts = async(req, res, next) => {

    let Products;
    //get all products
    try{
        products = await Product.find();
    }catch (err) {
        console.log(err);
    }
    //If products are not found
    if(!products){
        return res.status(404).json({message: "Product is not found"});
    }

    //Display all products
    return res.status(200).json({products});

};

//data insert
const addProduct = async(req, res, next) => {
    const {productImage,productName,category,productPrice} = req.body;

    let products;

    try{
        products = new Product({productImage,productName,category,productPrice});
        await products.save();
    }catch(err){
        console.log(err);
    }
    //if data is not inserted into the database
    if(!products){
        return res.status(404).json({message:"Unable to add product"});
    }
    return res.status(200).json({products});
}

//get by Id
const getById = async(req, res, next) => {
    const id = req.params.id;

    let products;

    try{
        products = await Product.findById(id);
    }catch(err){
        console.log(err);
    }
    //the product is not available
    if(!products){
        return res.status(404).json({message:"product is not found"});
    }
    return res.status(200).json({products});   
}

//update product details
const updateProduct = async(req, res, next) => {
    const id = req.params.id;
    const {productImage,productName,category,productPrice} = req.body;

    let products;

    try{
        products = await Product.findByIdAndUpdate(id,{productImage: productImage, productName: productName, category: category, productPrice: productPrice});
        products = await products.save();
    }catch(err){
        console.log(err);
    }
    //the product is not available
    if(!products){
        return res.status(404).json({message:"Unable to update product details"});
    }
    return res.status(200).json({products});       
}

//Delete product details
const deleteProduct = async(req, res, next) => {
    const id = req.params.id;

    let products;

    try{
        products = await Product.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!products){
        return res.status(404).json({message:"Unable to delete product details"});
    }
    return res.status(200).json({products});  

}

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
*/

const Product = require('../Model/ProductModel');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { productName, category, productPrice } = req.body;
    const productImage = req.file.filename;

    const product = new Product({
      productImage,
      productName,
      category,
      productPrice
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.productImage = req.file.filename;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};