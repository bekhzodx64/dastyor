import {createContext, useState} from "react";
import {useCookies} from "react-cookie";

const BasketContext = createContext({
  basket: [],
  basketTotal: 0,
  addToBasket: (item, index) => {
  },
  removeFromBasket: (itemId) => {
  },
  isExistInBasket: (id) => {
  },
  plusItem: (id) => {
  },
  minusItem: (id) => {
  },
  deleteItem: (id) => {
  },
  addFromCookieToBasket: (item) => {
  },
  setBasket: () => {
  },
  itemCount: (id) => {

  }
});

export function BasketContextProvider({children}) {
  const [basket, setBasket] = useState([]);
  const [cookie, setCookie] = useCookies(["basket"]);
  const basketCookie = cookie.basket;

  function addToBasket(item, idxColor = 0, idxSize = 0) {
    const newObj = {
      id: item.id,
      title: item.title,
      photo: item.photo,
      price: item.price,
      slug: item.slug,
      size: item.size.length === 0 ? 0 : item.size[idxSize].value,
      color: item.color.length === 0 ? 0 : item.color[idxColor].hex_code,
      category: item.category,
      count: 1,
      totalPrice: item.price
    };

    const obj = {
      id: item.id,
      count: 1,
    }

    const index = basket.findIndex(bask => bask.id === item.id);

    if (index > -1) {
      setBasket(state => [...state.slice(0, index), ...state.slice(index + 1)]);
    } else {
      setBasket(state => [...state, newObj]);
    }

    if (isExistInBasket(item.id)) {
      setCookie(
        "basket",
        [...basketCookie.slice(0, index), ...basketCookie.slice(index + 1)],
        {path: '/'}
      );
    } else {
      if (basketCookie) {
        setCookie("basket", [...basketCookie, obj], {path: '/'});
      } else {
        setCookie("basket", [obj], {path: '/'});
      }
    }
  }

  function isExistInBasket(id) {
    return basketCookie && basketCookie.find(item => item.id === id);
  }

  function addFromCookieToBasket(item, idxColor = 0, idxSize = 0) {
    const newObj = {
      id: item.id,
      title: item.title,
      photo: item.photo,
      price: item.price,
      slug: item.slug,
      category: item.category,
      size: item.size.length === 0 ? 0 : item.size[idxSize].value,
      color: item.color.length === 0 ? 0 : item.color[idxColor].hex_code,
      count: 1,
      totalPrice: item.price
    };

    if (basketCookie && basketCookie.length !== 0 && isExistInBasket(item.id)) {
      setBasket(state => [...state, newObj]);
    }
  }

  function deleteFromAside(id) {
    const index = basket.findIndex(item => item.id === id);
    setCookie("basket", [...basketCookie.slice(0, index), ...basketCookie.slice(index + 1)], {path: "/"});
    setBasket(state => [...state.slice(0, index), ...state.slice(index + 1)]);
  }

  function plusToBasket(id) {
    const item = basket.find(elem => elem.id === id);
    const index = basket.findIndex(elem => elem.id === id);
    if (item) {
      const newObj = {
        ...item,
        count: ++item.count,
        totalPrice: item.price * item.count,
      }

      const obj = {
        id: item.id,
        count: item.count
      }
      setCookie("basket", [...basketCookie.slice(0, index), obj, ...basketCookie.slice(index + 1)], {path: "/"});
      setBasket(state => [...state.slice(0, index), newObj, ...state.slice(index + 1)]);
    }
  }

  function minusFromBasket(id) {
    const item = basket.find(elem => elem.id === id);
    const index = basket.findIndex(elem => elem.id === id);
    if (item) {
      const newObj = {
        ...item,
        count: --item.count,
        totalPrice: item.price * item.count,
      }
      const obj = {
        id: item.id,
        count: item.count
      }
      setCookie("basket", [...basket.slice(0, index), obj, ...basket.slice(index + 1)], {path: "/"});
      setBasket(state => [...state.slice(0, index), newObj, ...state.slice(index + 1)]);
      if (item.count === 0) {
        setCookie("basket", [...basket.slice(0, index), ...basket.slice(index + 1)], {path: '/'});
        setBasket(state => [...state.slice(0, index), ...state.slice(index + 1)]);
      }
    }
  }

  function itemCount(id) {
    const obj = basket.find(bask => bask.id === id);
    if (obj) {
      return obj.count;
    }
  }

  const context = {
    basket: basket,
    itemCount,
    addToBasket,
    isExistInBasket,
    plusItem: plusToBasket,
    minusItem: minusFromBasket,
    deleteItem: deleteFromAside,
    addFromCookieToBasket,
    setBasket
  }
  return (
    <BasketContext.Provider value={context}>
      {children}
    </BasketContext.Provider>
  )
}

export default BasketContext;
