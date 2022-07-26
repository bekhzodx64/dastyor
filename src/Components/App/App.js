import React from 'react';
import AppRoutes from "../../AppRoutes";
import Navigation from "../Navigation";
import Footer from '../Footer';
import DashAndLiked from "../DashAndLiked";
import Providers from "../Providers";
import './App.css';

const App = () => {

  return (
    <Providers>
      <Navigation/>
      <main className='app'>
        <AppRoutes/>
        <DashAndLiked/>
      </main>
      <Footer/>
    </Providers>
  );
};

export default App;
