import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import CategoriesContext from "../../Context/CategoriesContext";
import Search from "../Search";
import MenuContext from "../../Context/MenuContext";
import './Categories.css';

const Categories = () => {
  const {categoryOpen, setCategoryOpen} = useContext(MenuContext);
  const {categories} = useContext(CategoriesContext);
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/product/search?q=${term}`);
  }

  return (
    <>
      <div className={categoryOpen ? 'categories active' : 'categories'}>
        <div className='menu__close'>
          <h4>Menu</h4>
          <svg onClick={() => setCategoryOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               width="24"
               height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414                       4.95-4.95-4.95-4.95L7.05 5.636z"/>
          </svg>
        </div>
        <div className="mobile__form">
          <Search setTerm={setTerm} term={term} onSubmit={onSubmit}/>
        </div>
        <ul className='categories__first'>
          {categories.map((category, index) => (
            <li key={category.id} onClick={() => setCategoryOpen(false)}>
              <NavLink to={`/category/${category.slug}`}>
                <span>
                    {
                      category.icon != null ? <img src={category.icon} alt={category.title}/> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                             height="24">
                          <path
                            fill="none" d="M0 0h24v24H0z"/>
                          <path
                            d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z"/>
                        </svg>
                    }
                </span>
                <span>
                  {category.title}
                </span>
                {
                  category.children == null ? null :
                    <span className='chevron__right'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path
                        fill="none" d="M0 0h24v24H0z"/><path
                        d="M13.172  12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
                    </span>
                }
              </NavLink>
              {
                category.children == null ? null :
                  <ul className='categories__second' key={index}>
                    {category.children.map(item => (
                      <li key={item.id}><NavLink
                        to={`/category/${item.slug}`}>{item.title}</NavLink>
                      </li>
                    ))}
                  </ul>
              }
            </li>
          ))}
          <li>
            <NavLink to='/category'>
              <span style={{opacity: '1'}}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                       xmlnsXlink="http://www.w3.org/1999/xlink" width="14"
                       height="14" viewBox="0 0 14 14">
                      <g>
                          <g>
                              <path fill="#ff5234" d="M7 0a7 7 0 1 1 0 14A7 7 0 0 1 7 0z"/>
                          </g>
                          <g>
                              <image width="8" height="8" transform="translate(3 3)"
                                     xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACpJREFUKFNjZEAC/////w/iMjIyMsKE4QyQAHkKYLqQrUJmMxJUQHtHAgAhWyABIHofDgAAAABJRU5ErkJggg=="/>
                          </g>
                      </g>
                  </svg>
              </span>
              <span>
                Всё
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='aside__overlay' onClick={() => setCategoryOpen(false)}/>
    </>
  );
};

export default Categories;