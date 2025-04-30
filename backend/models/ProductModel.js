/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productImage:{
        type:String, //dataType
        require:true, //validate
    },
    productName:{
        type:String, //dataType
        require:true, //validate
    },
    category: { // 👈 Added category field
        type: String,
        required: true,
        //enum: ["Rice","Nooldes","Kotthu","Pasta","Desserts","Snacks","Beverages"], // 👈 Predefined values
    },
    productPrice:{
        type:Number, //dataType
        require:true, //validate
    }
});

module.exports = mongoose.model(
    "ProductModel", //file name
    productSchema //function name
)*/

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productImage: String,
  productName: { type: String, required: true },
  category: { type: String, required: true },
  productPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);