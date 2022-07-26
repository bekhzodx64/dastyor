import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import SwiperCore, {Navigation} from "swiper";
import default__img from '../../Assets/Images/default__img.png';

SwiperCore.use([Navigation]);
const DetailComment = ({comments}) => {
  const starRated = new Array(5).fill(
    <svg width="13" height="12" viewBox="0 0 13 12" fill="#C1C8CE"
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.0001 4.67348L9.27319 7.46447L10.3674 12.0001L6.74598 9.26063L2.89136 11.8549L4.37986 7.3697L0.904053 4.4384L5.44515 4.40603L7.15143 6.10352e-05L8.46894 4.46476L13.0001 4.67348Z"
      />
    </svg>, 0, 5);
  return (
    <div className='detail-page__comment'>
      <Swiper loop={true} autoplay={{
        delay: 2000,
        disableOnInteraction: false
      }}>
        {comments.length === 0 ? <div>Отзывов ещё нет, будьте первым!</div> : comments.map(item => (
          <SwiperSlide key={item.id}>
            <div className='detail-page__comment-wrapper'>
              <div className='detail-page__comment-img'>
                <img src={item.client.photo != null ? item.client.photo : default__img}
                     alt="Dastyor Express"/>
              </div>
              <div className='detail-page__comment-descr'>
                <h4>{item.client.first_name + " " + item.client.last_name}</h4>
                <p>{item.text}</p>
                <div>
                   <span>
                       {starRated.map((star, index) => (
                         <i
                           className={index < item.rating ? 'detail-page__star active' : 'detail-page__star'}
                           key={index}>{star}</i>
                       ))}
                   </span>
                  <span>May 8, 2020</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailComment;