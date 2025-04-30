import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'


function Nav() {
  return (
    <div>
        <ul className='home-ul'>
            <li className='home-ll'>
                <Link to="/home" className='home'>
                    <h1>Home</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to="/addProduct" className='home'>
                     <h1>Add Product</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to="/productDetails" className='home'>
                    <h1>Product Details</h1>
                </Link>    
            </li>
            <li className='home-ll'>
                <Link to="/update-product/:id" className='home'>
                    <h1>Update Product </h1>
                </Link>    
            </li>
   
        </ul>
    </div>
  )
}

export default Nav

