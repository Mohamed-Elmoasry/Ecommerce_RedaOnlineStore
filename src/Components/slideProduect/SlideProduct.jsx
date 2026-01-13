
import Product from './Product'
import "./SlideProduct.css"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function SlideProduct({data,title}) {
  return (
    <div className='slide-products slide'>
      <div className="container">
        
        <div className="top-slide">
          <h2>{title}</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
        </div>

        <Swiper
        loop={true}
          slidesPerView={4}
          spaceBetween={10}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {data.map((item)=>{
            return(
               <SwiperSlide><Product item={item} /></SwiperSlide>
            )
          })}
         
          
        </Swiper>

      </div>
    </div>
  )
}
