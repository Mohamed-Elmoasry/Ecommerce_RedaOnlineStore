import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import "./headers.css"
import { CartContext } from '../Context/CartContext';
import SerachBox from './SerachBox';


export default function TopHeader() {

  const { cartItems, favorites } = useContext(CartContext)

  return (
    <div className='top-header'>
      <div className='container'>
        <Link to="/" className='logo'><img src="/img/logo.png" alt="logo" /></Link>

        <SerachBox />

        <div className="header-icons">
          <div className="icons">
            <Link to='/favorites'>
              <FaRegHeart />
              <span className='count'>{favorites.length}</span>
            </Link>
          </div>
          <div className="icons">
            <Link to='/cart'>
              <GiShoppingCart />
              <span className='count'>{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
