import { FaStar,FaCartArrowDown,FaRegHeart,  } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Product({item}) {
  const navigate = useNavigate()
 let {cartItems,addToCart,favorites,removeFromFavorites,addToFavorites} = useContext(CartContext)


 const isInCart = cartItems.some(i => i.id === item.id)
  

  const handleAddToCart = ()=> {
    addToCart(item)
    toast.success(
      <div className="stoast-wrapper">
        <img src= {item.images[0]} alt=""  className="tosat-img"/>

        <div className="toast-content">
          <strong>{item.title}</strong>
          added to Cart
        </div>
        <button onClick={()=> navigate('/cart')} className="btn">View Cart</button>
      </div>
      ,{duration : 3500}
    )
  }




  //Add FAv

   const isInFav = favorites.some(i => i.id === item.id)

  const handleAddToFav = ()=>{
    if(isInFav){
      removeFromFavorites(item.id)
      toast.error(`${item.title} Removed From Favorites`)
    }else{
        addToFavorites(item)
    toast.success(`${item.title} adedd To Favorites`)
    }
  
  }

  return (

    <div className={`product ${isInCart ? 'in-cart' : ''}`}>
  <Link to={`/products/${item.id}`}>
  <span className="status_cart"><FaCheck />in Cart</span>
    <div className="container">
      <div className="iamge">
        <img src={item.images[0]} alt="" />
      </div>
      <p className='name-product'>{item.title}</p>
      <div className="start">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStarHalfStroke />
      </div>
      <p className="price">$ {item.price}</p>
    </div>
  </Link>
  <div className="icons">
    <span className="btn_addtocart" onClick={(handleAddToCart) }><FaCartArrowDown /></span>
    <span className={`${isInFav ? "in-fav" : ""}`} onClick={handleAddToFav}><FaRegHeart /></span>
    <span><FaShare /></span>
  </div>
</div>

  )
}
