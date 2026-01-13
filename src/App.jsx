
import { Route, Routes } from 'react-router-dom';
import BtmHeader from './Components/header/BtmHeader';
import TopHeader from './Components/header/TopHeader';

import Home from './Page/Home/Home';
import ProductDetails from './Page/ProductDetails/ProductDetails';
import Cart from './Page/cart/Cart';
import { Toaster } from 'react-hot-toast';
import ScroalToTop from './Components/ScroalToTop';
import { AnimatePresence } from 'framer-motion';
import CategoryPage from './Page/Category/CategoryPage';
import SerachResailts from './Page/SerachResailts';
import Favorites from './Page/favorites/Favorites';



function App() {



  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#e9e9e9',
          borderRadius: '5px',
          padding: '14px'
        }
      }} />

      <ScroalToTop />

      <AnimatePresence mode="wait">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<SerachResailts />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/category/:category' element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>


    </>
  )
}

export default App
