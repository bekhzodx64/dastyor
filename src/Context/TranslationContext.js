import {createContext, useEffect, useState} from "react";
import {getData} from "../Repository/BaseApi";

const TranslationContext = createContext({
  translation: {}
});

export function TranslationContextProvider({children}) {
  const [translation, setTranslation] = useState({});
  useEffect(() => {
    getData('/translations/')
      .then(res => setTranslation(res.data))
      .catch(err => console.log(err));
  }, []);

  const context = {translation};

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationContext;