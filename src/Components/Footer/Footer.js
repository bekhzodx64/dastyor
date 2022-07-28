import React from 'react'
import './Footer.css'
import fast_delivery from '../../Assets/Images/fast_delivery.png'
import payment from '../../Assets/Images/payment.png'
import comission from '../../Assets/Images/comissions.png'
import app_icon from '../../Assets/Images/app_icon.png'
import { Link } from 'react-router-dom'

import { BsTwitter } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { FaGooglePlusG } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer__top'>
				<div className='container'>
					<div className='row gy-4 align-items-top'>
						<div className='col-lg-3 col-md-6 col-12'>
							<img src={fast_delivery} alt='Fast delivery' />
							<h4>Dastyor express быстрая ДОСТАВКА</h4>
							<span>Бесплатная доставка по Ташкенту</span>
							<span>Более 5 км 10.000 сум.</span>
						</div>
						<div className='col-lg-3 col-md-6 col-12'>
							<img src={payment} alt='Trusted Payments' />
							<h4>Доверенная оплата</h4>
							<span>100%</span>
							<span>Легкое возвращение</span>
						</div>
						<div className='col-lg-3 col-md-6 col-12'>
							<img src={comission} alt='Fast delivery' />
							<h4>Обеспеченный платеж</h4>
							<span>Все основные кредитные и дебетовые карты</span>
						</div>
						<div className='col-lg-3 col-md-6 col-12'>
							<img src={app_icon} alt='Fast delivery' />
							<h4>Магазин в приложении</h4>
							<span>Просто загрузите наш App & Shop</span>
							<span>С лучшими предложениями!</span>
						</div>
					</div>
				</div>
			</div>
			<div className='footer__bottom'>
				<div className='container'>
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
					<div className='row align-items-center gy-4'>
						<div className='col-lg-5 col-md-12'>
							<div className='footer__support'>
								По всем вопросам вы можете связаться с нами в любое удобное
								время по телефону:{' '}
								<a className='footer__phone' href='tel: +998905858585'>
									+99890 585 85 85
								</a>
								<div>
									Электронная почта:{' '}
									<a
										className='footer__mail'
										href='mailto: support@dastyorexpress.uz'
									>
										support@dastyorexpress.uz
									</a>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-12'>
							<ul className='footer__menu'>
								<li>
									<Link to='/'>Главная</Link>
								</li>
								<li>
									<Link to='/category'>категории</Link>
								</li>
								<li>
									<Link to='/about'>о нас </Link>
								</li>
								<li>
									<Link to='/contact'>Контакты</Link>
								</li>
							</ul>
						</div>
						<div className='col-lg-3 col-md-12'>
							<div className='footer__social'>
								<Link to='/faq'>Вопросы и ответы</Link>
								<ul>
									<li>
										<a
											href='https://twitter.com'
											target='_blank'
											rel='noreferrer'
										>
											<BsTwitter style={{ fontSize: '18px', color: '#fff' }} />
										</a>
									</li>
									<li>
										<a
											href='https://twitter.com'
											target='_blank'
											rel='noreferrer'
										>
											<FaFacebookF
												style={{ fontSize: '18px', color: '#fff' }}
											/>
										</a>
									</li>
									<li>
										<a
											href='https://twitter.com'
											target='_blank'
											rel='noreferrer'
										>
											<FaGooglePlusG
												style={{ fontSize: '24px', color: '#fff' }}
											/>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
