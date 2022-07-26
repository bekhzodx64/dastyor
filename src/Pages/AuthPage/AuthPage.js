import React, {useState} from 'react';
import '../LoginPage/LoginPage.css';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {createUser} from "../../Repository/UserApi";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../../Components/Modal";
import Categories from "../../Components/Categories";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too short!')
    .max(13, 'Too long')
    .required('Required')
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isExist, setIsExist] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: ""
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      createUser(values)
        .then(res => {
          if (res.request.statusText === 'Created') {
            formik.setValues({values: ''});
            navigate('/login');
          }
        })
        .catch(err => {
          if (err.response.data.error === "A client with this email address already exists!") {
            setIsExist(true);
          }
        });
    }
  })
  return (
    <section className='login-page'>
      <div className="contact-wrapper">
        <header className="login-cta">
          <h2>Sign in!</h2>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <input onChange={formik.handleChange} value={formik.values.first_name} name='first_name'
                   type="text" required/>
            <span>First Name</span>
          </div>
          {formik.errors.first_name ? <div className='error__field'>{formik.errors.first_name}</div> : null}
          <div className="form-row">
            <input onChange={formik.handleChange} value={formik.values.last_name} name='last_name'
                   type="text" required/>
            <span>Last Name</span>
          </div>
          {formik.errors.last_name ? <div className='error__field'>{formik.errors.last_name}</div> : null}
          <div className="form-row">
            <input onChange={formik.handleChange} value={formik.values.email} name='email' type="email"
                   required/>
            <span>Email</span>
          </div>
          {formik.errors.email ? <div className='error__field'>{formik.errors.email}</div> : null}
          <div className="form-row">
            <input
              onChange={formik.handleChange}
              autoComplete={'password'}
              value={formik.values.password}
              name='password'
              type="password" required/>
            <span>Password</span>
          </div>
          {formik.errors.password ? <div className='error__field'>{formik.errors.password}</div> : null}
          <div className="form-row">
            <input onChange={formik.handleChange} value={formik.values.phone} name='phone'
                   type="text" required/>
            <span>Number</span>
          </div>
          {formik.errors.password ? <div className='error__field'>{formik.errors.password}</div> : null}
          <div className="form-row"/>
          <div className="form-row">
            <button type="submit">Sign in!</button>
          </div>
        </form>
        <div className="socials-wrapper">
          <header>
            <h2>Sign in with your Social Account</h2></header>
          <ul>
            <li>
              <a href="https://google.com/" className="youtube">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.0338 20.4106 18.2644 22.5 15 22.5C10.8581 22.5 7.5 19.1419 7.5 15C7.5 10.8581 10.8581 7.5 15 7.5C16.9119 7.5 18.6513 8.22125 19.9756 9.39937L23.5112 5.86375C21.2787 3.78312 18.2925 2.5 15 2.5C8.09688 2.5 2.5 8.09688 2.5 15C2.5 21.9031 8.09688 27.5 15 27.5C21.9031 27.5 27.5 21.9031 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z"
                    fill="#FFC107"/>
                  <path
                    d="M3.94122 9.18188L8.0481 12.1938C9.15935 9.4425 11.8506 7.5 15 7.5C16.9118 7.5 18.6512 8.22125 19.9756 9.39937L23.5112 5.86375C21.2787 3.78312 18.2925 2.5 15 2.5C10.1987 2.5 6.03497 5.21062 3.94122 9.18188Z"
                    fill="#FF3D00"/>
                  <path
                    d="M15 27.5001C18.2288 27.5001 21.1625 26.2644 23.3806 24.2551L19.5119 20.9813C18.2147 21.9678 16.6297 22.5014 15 22.5001C11.7488 22.5001 8.98814 20.4269 7.94814 17.5338L3.87189 20.6744C5.94064 24.7226 10.1419 27.5001 15 27.5001Z"
                    fill="#4CAF50"/>
                  <path
                    d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.5714 18.8853 20.6833 20.0957 19.51 20.9819L19.5119 20.9806L23.3806 24.2544C23.1069 24.5031 27.5 21.25 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z"
                    fill="#1976D2"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://google.com/" className="facebook">
                <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M7.73627 2.96835C7.26877 2.87485 6.63737 2.805 6.24027 2.805C5.16503 2.805 5.09518 3.2725 5.09518 4.0205V5.35205H7.78302L7.54873 8.1103H5.09518V16.5H1.72974V8.1103H0L0 5.35205H1.72974V3.64595C1.72974 1.309 2.82809 0 5.58578 0C6.54388 0 7.24513 0.140251 8.15647 0.327251L7.73627 2.96835Z"
                        fill="white"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div style={{textAlign: 'center'}}>
          Have an account? <Link to={'/login'}>Sign in!</Link>
        </div>
        {isExist === true ?
          <Modal setState={setIsExist} text={'With this email, user already exists!'}/> : null}
      </div>
      <div className={'mobile__category'}>
        <Categories/>
      </div>
    </section>
  );
};

export default LoginPage;