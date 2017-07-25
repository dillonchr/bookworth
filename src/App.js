import React, { Component } from 'react';
import Search from './search/search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <p className="logo">B&#x221e;kworth.</p>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
