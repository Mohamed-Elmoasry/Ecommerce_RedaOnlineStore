import React, { useContext } from 'react'
import { FaRegHeart, FaRegStarHalfStroke, FaShare, FaStar } from 'react-icons/fa6'
import { TfiShoppingCart } from 'react-icons/tfi'
import { CartContext } from '../../Components/Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Productinfo({ Product }) {
     const navigate = useNavigate()
     let {cartItems,addToCart,favorites,removeFromFavorites,addToFavorites} = useContext(CartContext)
      const isInCart = cartItems.some(i => i.id === Product.id)

      const handleAddToCart = ()=> {
    addToCart(Product)
    toast.success(
      <div className="stoast-wrapper">
        <img src= {Product.images[0]} alt=""  className="tosat-img"/>

        <div className="toast-content">
          <strong>{Product.title}</strong>
          added to Cart
        </div>
        <button onClick={()=> navigate('/cart')} className="btn">View Cart</button>
      </div>
      ,{duration : 3500}
    )
  }


   //Add FAv

   const isInFav = favorites.some(i => i.id === Product.id)

  const handleAddToFav = ()=>{
    if(isInFav){
      removeFromFavorites(Product.id)
      toast.error(`${Product.title} Removed From Favorites`)
    }else{
        addToFavorites(Product)
    toast.success(`${Product.title} adedd To Favorites`)
    }
  
  }




    return (
        <div className="details_item">
            <h1 className='name'>{Product.title}</h1>
            <div className="star">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
            </div>
            <p className='price'>$ {Product.price}</p>
            <h5>Availability <span>{Product.availabilityStatus}</span></h5>
            <h5>Brand <span>{Product.brand}</span></h5>
            <p className='desc'>{Product.description}</p>
            <h5 className='stock'><span>Hurry Up! Only {Product.stock} products left in stock. </span></h5>
            <button onClick={handleAddToCart} className={`btn ${isInCart ? 'in-cart' : ''}`}>
               {isInCart ? "Item In Cart" :  "Add to Cart"} <TfiShoppingCart />
            </button>
            <div className="icons">
                <span className={`${isInFav ? "in-fav" : ""}`} onClick={handleAddToFav}><FaRegHeart /></span>
                <span><FaShare /></span>
            </div>
        </div>
    )
}
