import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import Card from "../../Components/Card";
import {getProductsRelated} from "../../Repository/ProductsApi";

const DetailSameContent = ({main_url}) => {
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    getProductsRelated(main_url)
      .then(res => {
        setRelatedData(res.data.results)
      })
      .catch(err => console.log(err));
  }, [main_url]);
  return (
    <div className="row detail-page__same-content gy-4">
      <div className="col-md-12">
        <h3 className='title'>Похожие товары</h3>
      </div>
      <Swiper
        slidesPerView={5}
        navigation={{
          prevEl: '.prev-button',
          nextEl: '.next-button'
        }}
        spaceBetween={20}
        autoplay={{
          delay: 3000
        }}
        breakpoints={{
          "320": {
            "slidesPerView": 2,
            "spaceBetween": 0
          },
          "768": {
            "slidesPerView": 3,
            "spaceBetween": 10
          },
          "1024": {
            "slidesPerView": 4,
            "spaceBetween": 20
          },
          "1400": {
            "slidesPerView": 5,
            "spaceBetween": 20
          }
        }}>
        {relatedData.map(item => (
          <SwiperSlide key={item.id}>
            <Card cardInfo={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailSameContent;