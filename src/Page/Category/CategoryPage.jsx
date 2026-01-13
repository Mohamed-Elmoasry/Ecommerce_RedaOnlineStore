import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../../Components/slideProduect/Product'
import "./CategoryPage.css";
import PageTransation from '../../Components/PageTransation'
export default function CategoryPage() {

    const {category} = useParams()

    const [categoryProducts, setcategoryProducts] = useState([])
    

    useEffect(()=>{
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data)=>{
            setcategoryProducts(data.products)
        })
    },[category])
    console.log(categoryProducts);
    

  return (
    <PageTransation key={category}>
        <div className='category_products'>
        <div className="container">
            <div className="top-slide">
          <h2>{category} </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
        </div>

            <div className="products">
                {categoryProducts.map((item,index)=> (
                    <Product item={item} key={index}/>
                ))}
            </div>
        </div>
    </div>
    </PageTransation>
    
  )
}
