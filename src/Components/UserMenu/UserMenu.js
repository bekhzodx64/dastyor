import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import UserInfoContext from "../../Context/UserInfoContext";
import Categories from "../Categories";
import default_img from '../../Assets/Images/default__img.png';
import AuthenticationContext from '../../Context/AuthenticationContext'
import './UserMenu.css';

const UserMenu = ({children}) => {
  const {userInfo} = useContext(UserInfoContext);
  const {logOut} = useContext(AuthenticationContext);

  return (
    <section className='user-menu'>
      <div className="container">
        <div className="row gy-4">
          <div className='col-lg-3 col-md-4 col-12'>
            <div style={{border: "1px solid #e8e8e8", padding: "10px 5px", backgroundColor: 'white'}}>
              <div className='user__info'>
                <img src={userInfo.photo != null ? userInfo.photo : default_img} alt="Dastyor Express"/>
                <h3>Orif Ismailov</h3>
              </div>
              <Link className='user__link' to={'/user/bookings'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                    d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1V4H2V2h3a1 1 0 0 1 1 1v6zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                </svg>
                My bookings

              </Link>
              <Link className='user__link' to={'/user/profile'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                    d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7l2.083-4.761zm.729-5.569a4.002 4.002 0 0 0 7.762 0l-1.94-.485a2 2 0 0 1-3.882 0l-1.94.485z"/>
                </svg>
                My profile
              </Link>
              <span className='user__link' onClick={logOut}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path
                    fill="none" d="M0 0h24v24H0z"/><path
                    d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm4 9V8l-5 4 5 4v-3h6v-2H9z"/></svg>
                  Log out
              </span>
            </div>
          </div>
          <div className='col-lg-9 col-md-8 col-12'>{children}</div>
        </div>
      </div>
      <div className={'mobile__category'}>
        <Categories/>
      </div>
    </section>
  );
};

export default UserMenu;