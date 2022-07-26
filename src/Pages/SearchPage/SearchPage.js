import React, {useEffect, useState} from 'react';
import * as queryString from "querystring";
import {useLocation} from "react-router";
import Card from "../../Components/Card";
import {searchProduct} from "../../Repository/BaseApi";
import Spinner from "../../Components/Spinner";
import './SearchPage.css';
import notfound from '../../Assets/Images/itemnofound.jpg';
import axios from "axios";
import Categories from "../../Components/Categories";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const search = parsed['?q'];

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
    searchProduct({
      q: search,
      order_by: '',
    })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .then(err => console.log(err));
  }, [search]);

  function showMore(e) {
    e.target.disabled = true;
    e.target.innerText = 'Загрузка...'
    if (products.next == null) {
      e.target.className = 'd-none'
    } else {
      axios.get(products.next)
        .then(res => {
          setProducts(state => {
            return {
              count: res.data.count,
              next: res.data.next,
              previous: res.data.previous,
              results: [
                ...state.results,
                ...res.data.results
              ]
            }
          });
          e.target.disabled = false;
          e.target.innerText = 'Показать ещё';
        })
        .catch(err => console.log(err));
    }
  }

  if (loading) {
    return <Spinner/>
  }

  const content = products.results.map(item => <Card key={item.id} cardInfo={item}/>);

  const contentNotFound = (
    <div className='search-page__notfound'>
      <img src={notfound} alt="Dastyor Express"/>
      <h3>Продукты не найдены!</h3>
    </div>
  )

  return (
    <section className='search-page'>
      <div className="container">
        <h2 className='title'>Поиск товара</h2>
        {
          products.results.length === 0 ? contentNotFound :
            <div className="search-page__content">
              {content}
            </div>
        }
        <button
          className={(products.results.length === 0 || products.results.length < 15) ? 'search-page__button d-none' : 'search-page__button'}
          onClick={showMore}>
          Показать ещё
        </button>
      </div>
      <div className={'mobile__category'}>
        <Categories/>
      </div>
    </section>
  );
};

export default SearchPage;