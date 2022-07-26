import {createContext, useState} from "react";

const AsideContext = createContext({
  basketOpen: false,
  likedOpen: false,
  setLikedOpen: () => {
  },
  setBasketOpen: () => {
  }
});

export function AsideContextProvider({children}) {
  const [basketOpen, setBasketOpen] = useState(false);
  const [likedOpen, setLikedOpen] = useState(false);
  const context = {basketOpen, likedOpen, setLikedOpen, setBasketOpen}
  return (
    <AsideContext.Provider value={context}>
      {children}
    </AsideContext.Provider>
  )
}

export default AsideContext;