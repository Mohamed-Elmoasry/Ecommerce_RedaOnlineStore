import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaRegStarHalfStroke, FaShare, FaStar } from 'react-icons/fa6';
import { useParams } from 'react-router-dom'
import "./ProductDetails.css";
import { TiShoppingCart } from 'react-icons/ti';
import { TfiShoppingCart } from 'react-icons/tfi';
import SlideProduct from '../../Components/slideProduect/SlideProduct';
import Productimages from './Productimages';
import Productinfo from './Productinfo';
import PageTransation from '../../Components/PageTransation';
export default function ProductDetails() {
  const { id } = useParams()

  const [Product, setProduct] = useState(null)
  const [Loding, setLoding] = useState(true)
  const [relatedProduct, setrelatedProduct] = useState([])
  const [LodingrelatedProduct, setLodingrelatedProduct] = useState(true)


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
        setLoding(false)
      } catch (error) {
        console.log(error);

      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (!Product) return;

    fetch(`https://dummyjson.com/products/category/${Product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setrelatedProduct(data.products);
      })
      .catch((error) => console.log(error))
      .finally(() => setLodingrelatedProduct(false));

  }, [Product]);






  if (Loding) return <div className="spinner"></div>
  if (!Product) return <p>Product Not Found!!</p>


  return (
    <PageTransation key={id}>
       <div>
      <div className='item_details'>
        <div className="container">

          <Productimages product={Product} />

          <Productinfo Product={Product} />

        </div>

      </div>

      {LodingrelatedProduct ? (
        <p>Loding....</p>
      ) : (
        <SlideProduct key={Product.category} title={Product.category.replace("-", " ")} data={relatedProduct} />
      )}
    </div>
      </PageTransation>
   
  )
}