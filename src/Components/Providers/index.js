import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CategoriesContextProvider} from "../../Context/CategoriesContext";
import {UserInfoContextProvider} from "../../Context/UserInfoContext";
import {AuthenticationContextProvider} from "../../Context/AuthenticationContext";
import {AsideContextProvider} from "../../Context/AsideContext";
import {BasketContextProvider} from "../../Context/BasketContext";
import {FavoriteContextProvider} from "../../Context/FavoriteContext";
import {TranslationContextProvider} from "../../Context/TranslationContext";
import {LocationContextProvider} from "../../Context/LocationContext";
import {MenuContextProvider} from "../../Context/MenuContext";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Providers = ({children}) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pk_test_51KGiSSGkxF61LyvBXOXdKaWCNdPo3aam7BKpyafjxlOgyT8RzmAF0VYkUgOlOPpdzL3OyOdA2l8c1L1PjKhQurqg00dXf4DEps',
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <LocationContextProvider>
      <CategoriesContextProvider>
        <UserInfoContextProvider>
          <AuthenticationContextProvider>
            <AsideContextProvider>
              <BasketContextProvider>
                <FavoriteContextProvider>
                  <TranslationContextProvider>
                    <MenuContextProvider>
                      {children}
                    </MenuContextProvider>
                  </TranslationContextProvider>
                </FavoriteContextProvider>
              </BasketContextProvider>
            </AsideContextProvider>
          </AuthenticationContextProvider>
        </UserInfoContextProvider>
      </CategoriesContextProvider>
    </LocationContextProvider>
    </Elements>
  );
};

export default Providers;