import { useEffect, useState } from 'react';
import HeroSlider from '../../Components/header/HeroSlider';
import SlideProduct from '../../Components/slideProduect/SlideProduct';
import "./home.css";
import PageTransation from '../../Components/PageTransation';

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

export default function Home() {
  const [Products, setProducts] = useState({});
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            return { [category]: data.products };
          })
        );
        const ProductsData = Object.assign({}, ...results);
        setProducts(ProductsData);
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <PageTransation>
      <div>
      <HeroSlider />
      {Loading ? (
        <div className="spinner"></div>
      ) : (
        categories.map((category) => (
          <SlideProduct key={category} data={Products[category] || []} title={category.replace("-"," ")} />
        ))
      )}
    </div>
    </PageTransation>
    
  );
}
