import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageTransation from '../Components/PageTransation';
import Product from '../Components/slideProduect/Product';

export default function SerachResailts() {
    const [Loding, setLoding] = useState(false)
    const [result, setresult] = useState([])
    const query = new URLSearchParams(useLocation().search).get("query");

    console.log(result);
   

   useEffect(() => {
    const fetchResults = async () => {
        setLoding(true);
        try {
            const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
            const data = await res.json();
            setresult(data.products || [])
        } catch (error) {
            console.log("Search Error :", error);
        }
        setLoding(false);
    }
    if (query) fetchResults();
}, [query])


    if (Loding) return <div class="spinner"></div>

    return (

        <PageTransation key={query}>
            <div className='category_products'>
                <div className="container">
                    <div className="top-slide">
                        <h2>Results for : {query}</h2>
                    </div>

                    <div className="products">
                        {result.map((item, index) => (
                            <Product item={item} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </PageTransation>

    )
}
