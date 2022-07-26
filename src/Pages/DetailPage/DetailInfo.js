import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import default__img from "../../Assets/Images/default__img.png";
import AuthenticationContext from "../../Context/AuthenticationContext";
import BasketContext from "../../Context/BasketContext";

const DetailInfo = ({data, starRated, comments, setModal}) => {
  const {authenticated} = useContext(AuthenticationContext);
  const [selectedColor, setSelectedColor] = useState(null);

  const {
    addToBasket,
    plusItem,
    minusItem,
    addFromCookieToBasket,
    isExistInBasket,
    itemCount
  } = useContext(BasketContext);

  const location = useLocation();

  useEffect(() => {
    if (isExistInBasket(data.id)) {
      addFromCookieToBasket(data);
    }
  }, [data]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <React.Fragment>
      <h4 className="detail-page__title">
        {data.title}
      </h4>
      <div className='detail-page__rated'>
        <div>
          {starRated.map((item, index) => (
            <i className={index < data.rating ? 'detail-page__star active' : 'detail-page__star'}
               key={index}>{item}</i>
          ))}
        </div>
        <div>{comments.count} отзывов</div>
        {authenticated ? <div onClick={() => setModal(true)}>Оставить отзыв</div> :
          <div><Link to='/login'>Войдите, чтобы оставить отзыв!</Link></div>}
      </div>
      <div className='detail-page__price'>
        {data.discount == null ?
          <span className='curr_price'>Цена: {numberWithCommas(`${data.price}`)} UZS</span>
          :
          <>
            <span>Цена: {numberWithCommas(`${data.dicounted_price}`)} UZS</span>
            <span>{numberWithCommas(`${data.price}`)}</span>
            <span>{data.discount}% скидка</span>
          </>
        }
      </div>
      <div className='detail-page__exists'>
        {data.color.length === 0 ? null :
          <>
            <h5>Доступные цвета:</h5>
            <div>
              {data.color.map((item, index) => (
                <span
                  className={selectedColor === index ? "active" : ""}
                  key={item.id}
                  onClick={() => setSelectedColor(index)}
                  style={{backgroundColor: item.hex_code}}
                />
              ))}
            </div>
          </>}
      </div>
      <div className='detail-page__buttons'>
        <div className='detail-page__addmore'>
          <span
            onClick={() => {
              minusItem(data.id);
            }}>
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V2H10V0Z" fill="#FF3C20"/>
              </svg>
          </span>
          <span>{itemCount(data.id) ? itemCount(data.id) : 0}</span>
          <span
            onClick={() => {
              plusItem(data.id);
            }}>
             <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10L6 0L4 -8.74228e-08L4 10L6 10Z" fill="#FF3C20"/>
                <path d="M0 6L10 6L10 4L1.74846e-07 4L0 6Z" fill="#FF3C20"/>
            </svg>
          </span>
        </div>
        <button
          onClick={() => addToBasket(data, selectedColor)}
          className={isExistInBasket(data.id) ? 'active' : ''}
          disabled={selectedColor == null}
        >
          <svg fill="#FF3C20" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.55 13C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C21.25 4.82 20.77 4 20.01 4H5.21L4.27 2H1V4H3L6.6 11.59L5.25 14.03C4.52 15.37 5.48 17 7 17H19V15H7L8.1 13H15.55ZM6.16 6H18.31L15.55 11H8.53L6.16 6ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"/>
          </svg>
          {isExistInBasket(data.id) ? <span>Добавлено</span> : <span>В корзину</span>}
        </button>
        <button>
          <svg width="21" height="18" viewBox="0 0 21 18" fill="#FF3C20"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 12H8C6.3596 11.9994 4.75023 12.4471 3.34588 13.2949C1.94152 14.1427 0.795601 15.3582 0.0320014 16.81C0.010538 16.5405 -0.000137283 16.2703 1.33261e-06 16C1.33261e-06 10.477 4.477 6 10 6V0.5L20.5 9L10 17.5V12ZM8 10H12V13.308L17.321 9L12 4.692V8H10C8.85025 7.99871 7.71379 8.24582 6.66839 8.72442C5.62299 9.20302 4.69332 9.90182 3.943 10.773C5.23432 10.2612 6.61096 9.99892 8 10Z"
            />
          </svg>
          <span>Поделиться</span>
          <div className='detail-page__dropdown'>
            {data.social_media_links.map(item => (
              <a href={item.link + `https://dastyor.com${location.pathname}`} key={item.id} target="_blank"
                 rel="noreferrer">
                <img src={"https://dastyor.site.uz" + item.icon} alt="Dastyor Express"/>
                {item.title}
              </a>
            ))}
          </div>
        </button>
      </div>
      <div className="detail-page__seller">
        <img src={data.seller.photo ? data.seller.photo : default__img} alt="Dastyor Express"/>
        <div className='seller__info'>
          <h5>{data.seller.shop_name}</h5>
          <div>
            <span>
              {starRated.map((item, index) => (
                <i
                  className={data.seller.average_rating > index ? 'active' : ''}
                  key={index}
                >
                  {item}
                </i>
              ))}
            </span>
            <Link to={`/seller/${data.seller.unique_id}`}>Все продукты автора</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailInfo;