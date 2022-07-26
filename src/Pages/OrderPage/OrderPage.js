import React, {useContext} from 'react';
import {useFormik} from "formik";
import {useCookies} from "react-cookie";
import * as Yup from "yup";

import UserInfoContext from "../../Context/UserInfoContext";
import {createOrder} from "../../Repository/ProductsApi";
import Categories from "../../Components/Categories";
import BasketContext from "../../Context/BasketContext";
import './OrderPage.css';
import {PaymentElement} from '@stripe/react-stripe-js';

const OrderSchema = Yup.object().shape({
  client: Yup.number(),
  fullname: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .min(7, "Too short")
    .required("Required"),
  address_line: Yup.string()
    .min(10, "Too short")
    .required("Required"),
  country: Yup.string()
    .min(5, "Too short")
    .required("Required"),
  region: Yup.string()
    .min(5, "Too short")
    .required("Required"),
  city: Yup.string()
    .min(5, "Too short")
    .required("Required"),
  postcode: Yup.number()
    .min(5, "Too short")
    .required("Required")
});

const OrderPage = () => {
  const {userInfo} = useContext(UserInfoContext);
  const {basket, setBasket} = useContext(BasketContext);
  const arr = basket && basket.filter(item => item.totalPrice).map(item => item.totalPrice);
  const totalPrice = arr && arr.length !== 0 && arr.reduce((prevItem, currItem) => prevItem + currItem);
  const [, setCookie] = useCookies(['basket']);
  const sendOrderedItems = basket && basket.map(item => {
    return {
      product: item.id,
      quantity: item.count,
      color: item.color,
      size: item.size
    }
  });


  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const formik = useFormik({
    initialValues: {
      client: userInfo.id,
      fullname: "",
      phone: "",
      email: "",
      address_line: "",
      country: "",
      region: "",
      city: "",
      postcode: "",
      items: sendOrderedItems && [...sendOrderedItems]
    },
    enableReinitialize: true,
    validationSchema: OrderSchema,
    onSubmit: values => {
      createOrder(values)
        .then((res) => {
          console.log(res);
          setBasket([]);
          setCookie("basket", [], {path: '/'});
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <section className='order'>
      <div className="container">
        <h2 className='title'>Оформление заказа</h2>
        <form className='order__form' onSubmit={formik.handleSubmit}>
          <div className="first_step">
            <div className="order__inputs">
              <label htmlFor="fullname">
                <span>Full Name</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  placeholder={'Full Name'}
                  id='fullname'
                  required={true}
                  name='fullname'
                  type="text"/>
                {formik.errors.fullname ?
                  <div className='error__field'>{formik.errors.fullname}</div> : null}
              </label>
              <label htmlFor="phone">
                <span>Phone</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder={'Phone'}
                  id='phone'
                  required={true}
                  name='phone'
                  type="number"/>
                {formik.errors.phone ?
                  <div className='error__field'>{formik.errors.phone}</div> : null}
              </label>

              <label htmlFor="email">
                <span>Email</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder={'Email'}
                  id='email'
                  required={true}
                  name='email'
                  type="email"/>
                {formik.errors.email ?
                  <div className='error__field'>{formik.errors.email}</div> : null}
              </label>

              <label htmlFor="address_line">
                <span>Address Line</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.address_line}
                  placeholder={'Address Line'}
                  id='address_line'
                  required={true}
                  name='address_line'
                  type="text"/>
                {formik.errors.address_line ?
                  <div className='error__field'>{formik.errors.address_line}</div> : null}
              </label>

              <label htmlFor="country">
                <span>Country</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  placeholder={'Country'}
                  id='country'
                  required={true}
                  name='country'
                  type="text"/>
                {formik.errors.country ?
                  <div className='error__field'>{formik.errors.country}</div> : null}
              </label>

              <label htmlFor="region">
                <span>Region</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.region}
                  placeholder={'Region'}
                  id='region'
                  required={true}
                  name='region'
                  type="text"/>
                {formik.errors.region ?
                  <div className='error__field'>{formik.errors.region}</div> : null}
              </label>

              <label htmlFor="city">
                <span>City</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  placeholder={'City'}
                  id='city'
                  required={true}
                  name='city'
                  type="text"/>
                {formik.errors.city ?
                  <div className='error__field'>{formik.errors.city}</div> : null}
              </label>

              <label htmlFor="postcode">
                <span>Post Code</span>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.postcode}
                  placeholder={'Post Code'}
                  id='postcode'
                  required={true}
                  name='postcode'
                  type="number"/>
                {formik.errors.postcode ?
                  <div className='error__field'>{formik.errors.postcode}</div> : null}
              </label>
            </div>
            <div className="order__overall">
              <div className='order__payment'>
              <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path
                    fill="none" d="M0 0h24v24H0z"/><path
                    d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z"/></svg>
              </span>
                <div>
                  <span>Любая форма оплаты</span>
                  <span>Картой онлайн или наличными при нолучении</span>
                </div>
              </div>
              <div className="order__quantity">
                <div>
                  <span>Товары({basket && basket.length})</span>
                  <span>{totalPrice ? numberWithCommas(totalPrice) : 0} сум</span>
                </div>
                <div>
                  <span>Доставка</span>
                  <span>15 000 сум</span>
                </div>
                <div>
                  <b>Итого</b>
                  <b>{numberWithCommas(totalPrice + 15000)} сум</b>
                </div>
              </div>
              <button
                type='submit'
                disabled={typeof basket == "undefined" || basket.length === 0}
                className='order__button'
              >
                Оформить заказ
              </button>
            </div>
          </div>
          <div className="second_step">
            <h4>Выберите тип оплаты:</h4>
            <PaymentElement/>
          </div>
        </form>
      </div>
      <div className={'mobile__category'}>
        <Categories/>
      </div>
    </section>
  );
};

export default OrderPage;