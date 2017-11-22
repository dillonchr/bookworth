import React from 'react';
import Search from './search/search';
import './App.css';

export default () => (
  <div className='App'>
    <header>
      <img className='App__logo' alt='Bookworth Logo' src='imgs/logo.gif' />
    </header>
    <Search />
  </div>
);
