import React, { Component } from 'react';
import Search from './search/search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
            <img className='App__logo' alt='Bookworth Logo' src='imgs/logo.gif' />
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
