import React, { Component } from 'react';
import logo from './logo.svg';
import './media/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderContainer } from './containers/layout/HeaderContainer';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Routes />
      </div>
    );
  }
}

export default App;
