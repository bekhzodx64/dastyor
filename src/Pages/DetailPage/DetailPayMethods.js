import React from 'react';
import visa from "../../Assets/Images/visa.png";
import mastercard from "../../Assets/Images/mastercard.png";
import stripe from "../../Assets/Images/stripe.png";
import paypal from "../../Assets/Images/paypal.png";
import googlepay from "../../Assets/Images/googlePay.png";
import applepay from "../../Assets/Images/applepay.png";
import payme from "../../Assets/Images/payme.png";
import click from "../../Assets/Images/click.png";

const DetailPayMethods = () => {
  return (
    <div className='detail-page__payment'>
      <h5>Доступные методы оплаты:</h5>
      <div>
        <img src={visa} alt="Dastyor Express"/>
        <img src={mastercard} alt="Dastyor Express"/>
        <img src={stripe} alt="Dastyor Express"/>
        <img src={paypal} alt="Dastyor Express"/>
        <img src={googlepay} alt="Dastyor Express"/>
        <img src={applepay} alt="Dastyor Express"/>
        <img src={payme} alt="Dastyor Express"/>
        <img src={click} alt="Dastyor Express"/>
      </div>
    </div>
  );
};

export default DetailPayMethods;