import React from 'react';
import './Footer.css';
import fast_delivery from '../../Assets/Images/fast_delivery.png';
import payment from '../../Assets/Images/payment.png';
import comission from '../../Assets/Images/comissions.png';
import app_icon from '../../Assets/Images/app_icon.png';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__top">
                <div className="container">
                    <div className="row gy-4 align-items-top">
                        <div className="col-lg-3 col-md-6 col-12">
                            <img src={fast_delivery} alt="Fast delivery"/>
                            <h4>Dastyor express быстрая ДОСТАВКА</h4>
                            <span>Бесплатная доставка по Ташкенту</span>
                            <span>Более 5 км 10.000 сум.</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <img src={payment} alt="Trusted Payments"/>
                            <h4>Доверенная оплата</h4>
                            <span>100%</span>
                            <span>Легкое возвращение</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <img src={comission} alt="Fast delivery"/>
                            <h4>Обеспеченный платеж</h4>
                            <span>Все основные кредитные и дебетовые карты</span>

                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <img src={app_icon} alt="Fast delivery"/>
                            <h4>Магазин в приложении</h4>
                            <span>Просто загрузите наш App & Shop</span>
                            <span>С лучшими предложениями!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    {/*<div className="row align-items-center gy-4">*/}
                    {/*    <div className="col-lg-3 col-md-5 col-12">*/}
                    {/*        <div className="footer__logo">*/}
                    {/*            <Link to='/'>*/}
                    {/*                <img src={footerLogo} alt="Dastyor Express"/>*/}
                    {/*            </Link>*/}
                    {/*            <div>*/}
                    {/*                <span>© ООО «DastyorExpress».</span>*/}
                    {/*                <span>Все права защищены.</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-lg-6 col-md-7 col-12">*/}
                    {/*        <div className="footer__app">*/}
                    {/*            <span>*/}
                    {/*                Устанавливайте приложение*/}
                    {/*                и делайте покупки легко*/}
                    {/*            </span>*/}
                    {/*            <div>*/}
                    {/*                <a target='_blank' href='/' rel="noreferrer">*/}
                    {/*                    <img src={google_play} alt="Dastyor Express Google Play"/>*/}
                    {/*                </a>*/}
                    {/*                <a target='_blank' href='/' rel="noreferrer">*/}
                    {/*                    <img src={app_store} alt="Dastyor Express App Store"/>*/}
                    {/*                </a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-lg-3 col-md-12 col-12">*/}
                    {/*        <div className="footer__payment">*/}
                    {/*            <span>Оплата наличными или картами онлайн:</span>*/}
                    {/*            <div>*/}
                    {/*                <a target='_blank' href='/'>*/}
                    {/*                    <img src={paypal} alt="Dastyor Express Click"/>*/}
                    {/*                </a>*/}
                    {/*                <a target='_blank' href='/'>*/}
                    {/*                    <img src={visa} alt="Dastyor Express Click"/>*/}
                    {/*                </a>*/}
                    {/*                <a target='_blank' href='/'>*/}
                    {/*                    <img src={mastercard} alt="Dastyor Express Click"/>*/}
                    {/*                </a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<hr/>*/}
                    <div className="row align-items-center gy-4">
                        <div className="col-lg-5 col-md-12">
                            <div className="footer__support">
                                По всем вопросам вы можете связаться с нами в любое удобное время по
                                телефону: <a className='footer__phone' href='tel: +998905858585'>+99890 585 85 85</a>
                                <div>
                                    Электронная почта: <a className='footer__mail'
                                                          href='mailto: support@dastyorexpress.uz'>support@dastyorexpress.uz</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <ul className='footer__menu'>
                                <li><Link to='/'>Главная</Link></li>
                                <li><Link to='/category'>категории</Link></li>
                                <li><Link to='/about'>о нас </Link></li>
                                <li><Link to='/contact'>Контакты</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <div className='footer__social'>
                                <Link to='/faq'>Вопросы и ответы</Link>
                                <ul>
                                    <li>
                                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="17" height="14"
                                                 viewBox="0 0 17 14">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M17 1.658a6.91 6.91 0 0 1-2.003.557A3.536 3.536 0 0 0 16.53.26c-.675.405-1.42.699-2.215.857A3.458 3.458 0 0 0 11.77.001c-1.927 0-3.488 1.582-3.488 3.534 0 .277.031.547.09.806C5.476 4.194 2.906 2.786 1.186.648c-.3.522-.471 1.13-.471 1.776 0 1.227.616 2.309 1.55 2.942a3.443 3.443 0 0 1-1.579-.442v.044c0 1.713 1.202 3.14 2.798 3.466a3.484 3.484 0 0 1-1.575.06c.444 1.404 1.732 2.426 3.257 2.455a6.94 6.94 0 0 1-5.163 1.463A9.777 9.777 0 0 0 5.348 14c6.414 0 9.922-5.386 9.922-10.055 0-.153-.004-.306-.01-.457A7.136 7.136 0 0 0 17 1.658z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="9" height="18"
                                                 viewBox="0 0 9 18">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M5.985 17.992H1.987V9.495H-.01V6.222h1.998V4.258C1.987 1.588 3.115 0 6.32 0h2.669v3.274H7.32c-1.248 0-1.331.457-1.331 1.31l-.005 1.638h3.022l-.354 3.273H5.985z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="15"
                                                 viewBox="0 0 24 15">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M7.615 14.999C3.41 14.999 0 11.64 0 7.499 0 3.36 3.41.002 7.615.002a7.65 7.65 0 0 1 5.136 1.964L10.508 4.13a4.506 4.506 0 0 0-2.893-1.044c-2.475 0-4.482 1.976-4.482 4.414 0 2.438 2.007 4.414 4.482 4.414a4.481 4.481 0 0 0 4.19-2.848H7.52V5.933h7.543c.11.506.167 1.03.167 1.567 0 4.141-3.409 7.499-7.614 7.499zM24 8.069h-2.65v2.61h-1.928V8.07h-2.65V6.172h2.65V3.56h1.928v2.61H24z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;