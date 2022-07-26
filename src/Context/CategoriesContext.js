import {createContext, useEffect, useState} from "react";
import {getCategories} from "../Repository/BaseRequests";

const CategoriesContext = createContext({
  categories: [],
  setCategories: () => {
  }
});

export function CategoriesContextProvider({children}) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const context = {categories, setCategories};
  return (
    <CategoriesContext.Provider value={context}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesContext;