/*import React from 'react'

function Product(props) {

  const {_id,productImage,productName,category,productPrice} = props.Product;

  return (
    <div>
        <h1>Product Display</h1>

        <br/>
        <h1>ID:{_id}</h1>
        <h1>productImage: {productImage}</h1>
        <h1>productName:{productName}</h1>
        <h1>category:{category}</h1>
        <h1>productPrice:{productPrice}</h1>
        <button>Update</button>
        <button>Delete</button>
    </div>
  )
}

export default Product
*/

import React from 'react'

function Product(props) {
  const { product } = props; // Changed from props.Product to props.product
  const { _id, productImage, productName, category, productPrice } = product;

  return (
    <div>
        <h1>Product Display</h1>
        <br/>
        <h1>ID: {_id}</h1>
        <h1>productImage: {productImage}</h1>
        <h1>productName: {productName}</h1>
        <h1>category: {category}</h1>
        <h1>productPrice: {productPrice}</h1>
        <button>Update</button>
        <button>Delete</button>
    </div>
  )
}

export default Product;