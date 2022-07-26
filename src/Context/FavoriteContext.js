import {createContext, useState} from "react";
import {useCookies} from "react-cookie";

const FavoriteContext = createContext({
  favorite: [],
  addToFavorite: (item) => {
  },
  removeFromFavorite: (item) => {
  },
  itemIsFavorite: (id) => {
  },
  addFromCookieToFavorite: (item) => {
  }
});

export function FavoriteContextProvider({children}) {
  const [favorite, setFavorite] = useState([]);
  const [cookie, setCookie] = useCookies(["favorite"]);

  function addToFavorite(cardInfo) {
    const newObj = {
      id: cardInfo.id,
      title: cardInfo.title,
      photo: cardInfo.photo,
      price: cardInfo.price,
      slug: cardInfo.slug,
      category: cardInfo.category,
    }
    const obj = {
      id: cardInfo.id
    }

    const index = cookie.favorite && cookie.favorite.findIndex(item => item.id === cardInfo.id);
    if (index > -1) {
      setCookie("favorite", [...cookie.favorite.slice(0, index), ...cookie.favorite.slice(index + 1)], {path: '/'});
    } else {
      if (cookie.favorite) {
        setCookie("favorite", [...cookie.favorite, obj], {path: '/'});
      } else {
        setCookie("favorite", [obj], {path: '/'});
      }
    }
    if (index > -1) {
      setFavorite(state => [...state.slice(0, index), ...state.slice(index + 1)]);
    } else {
      setFavorite(state => [...state, newObj]);
    }

  }

  function removeFromFavorite(id) {
    const index = favorite.findIndex(item => item.id === id);
    setFavorite(state => [...state.slice(0, index), ...state.slice(index + 1)]);
    setCookie("favorite", [...cookie.favorite.slice(0, index), ...cookie.favorite.slice(index + 1)], {path: '/'});
  }

  function itemIsFavorite(itemId) {
    return cookie.favorite && cookie.favorite.some(liked => liked.id === itemId);
  }

  function addFromCookieToFavorite(cardInfo) {
    const newObj = {
      id: cardInfo.id,
      title: cardInfo.title,
      photo: cardInfo.photo,
      price: cardInfo.price,
      slug: cardInfo.slug,
      category: cardInfo.category,
    }
    if (cookie.favorite && cookie.favorite.length !== 0 && itemIsFavorite(cardInfo.id)) {
      setFavorite(state => [...state, newObj]);
    }
  }

  const context = {
    favorite,
    addToFavorite,
    removeFromFavorite,
    itemIsFavorite,
    addFromCookieToFavorite
  }
  return (
    <FavoriteContext.Provider value={context}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContext;