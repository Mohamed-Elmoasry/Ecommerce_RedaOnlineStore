import React, { useContext } from 'react'
import { CartContext } from '../../Components/Context/CartContext'
import { FaTrashCan } from "react-icons/fa6";
import "./Cart.css"
import PageTransation from '../../Components/PageTransation';
export default function Cart() {

    const {cartItems, increaseQuantity,decreaseQuantity,removeFromCart} = useContext(CartContext)
    console.log(cartItems);

    const total = cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0)
    
  return (

    <PageTransation>
          <div className='check_out'>
        <div className="ordersummary">
            <h1>Order Summary</h1>

            <div className="items">
            {cartItems.length === 0 ? (
                <p>Your Cart is empty.</p>
            ):(cartItems.map((item,index)=>(
                <div className="item_cart" key={index}>
                    <div className="image_name">
                        <img src={item.images[0]} alt="" />

                        <div className="content">
                            <h4>{item.title}</h4>
                            <p className='price_item'>${item.price}</p>
                            <div className="quantity_control">
                                <button onClick={()=> decreaseQuantity(item.id)}>-</button>
                                <span className='quantity'>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>

                            </div>
                        </div>

                    </div>
                        <button onClick={() => removeFromCart(item.id)} className='delete_item'><FaTrashCan /></button>
                </div>
            )))}
        </div>
        

        

        <div className="bottom-summary">
            <div className="shop_table">
                <p>Total:</p>
                <span className='total-check_out'>${total.toFixed(2)}</span>
            </div>
            <div className="button_div">
                <button type='submit'>Place Order</button>
            </div>
        </div>
    </div>
    </div>
        </PageTransation>
  
  )
}
