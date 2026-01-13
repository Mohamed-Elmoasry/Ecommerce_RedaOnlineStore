import React, { useContext } from 'react'
import { CartContext } from '../../Components/Context/CartContext'
import PageTransation from '../../Components/PageTransation'
import Product from '../../Components/slideProduect/Product'


 


export default function Favorites() {

    let {favorites} = useContext(CartContext)
  return (
    <PageTransation>
        <div className="category_products FavoritesPags">
            <div className="container">
                <div className="top-slide">
                    <h2>Your Favorites</h2>
                </div>

                {favorites.length === 0 ? (
                    <p>No Favorites Products yet.</p>
                ): (
                    <div className="products">
                        {favorites.map(item => (
                             <Product item={item} key={item.id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </PageTransation>
  )
}
