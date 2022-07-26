import React from 'react';
import {Link} from "react-router-dom";

const DetailNavigation = ({data, url, main_url}) => {
    return (
        <div className='detail-page__navigation'>
            <Link to='/'>
                Главная
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.72681 11.06L8.78014 8L5.72681 4.94L6.66681 4L10.6668 8L6.66681 12L5.72681 11.06Z"
                        fill="#9D9D9D"/>
                </svg>
            </Link>
            <Link to='/category'>
                Категории
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.72681 11.06L8.78014 8L5.72681 4.94L6.66681 4L10.6668 8L6.66681 12L5.72681 11.06Z"
                        fill="#9D9D9D"/>
                </svg>
            </Link>
            <Link to={`/category/${url}`}>
                {data.category.title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.72681 11.06L8.78014 8L5.72681 4.94L6.66681 4L10.6668 8L6.66681 12L5.72681 11.06Z"
                        fill="#9D9D9D"/>
                </svg>
            </Link>
            <Link to={`/category/${url}/${main_url}`}>
                {data.title}
            </Link>
        </div>
    );
};

export default DetailNavigation;