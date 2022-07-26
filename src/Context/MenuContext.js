import {createContext, useState} from "react";

const MenuContext = createContext({
  categoryOpen: false,
  setCategoryOpen: () => {
  }
});


export function MenuContextProvider({children}) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const context = {categoryOpen, setCategoryOpen};
  return (
    <MenuContext.Provider value={context}>
      {children}
    </MenuContext.Provider>
  )
}


export default MenuContext;